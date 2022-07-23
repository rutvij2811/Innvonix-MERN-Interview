const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const mailgun = require("mailgun-js");
const { nanoid } = require('nanoid');

const mg = mailgun({
	apiKey: process.env.MAILGUN_API,
	domain: process.env.MAILGUN_DOMAIN,
});

const JWT_SECRET = process.env.JWT_SECRET;
// nanoid = customAlphabet('1234567890abcdefghijklmnopkrstuvwxyz', 3)

// ROUTE 1: Create a user using : POST "api/auth/createuser". No login required.
router.post(
	"/createuser",
	[
		body("name").isLength({ min: 3 }),
		body("email").isEmail(),
		body("password").isLength({ min: 5 }),
	],
	async (req, res) => {
		// console.log(req.body);
		let success = false;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success, errors: errors.array() });
		}

		// Check whether the user with this email exists already
		try {
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res
					.status(400)
					.json({
						success,
						error: "Sorry a user with this email already exists",
					});
			}

	let uid = nanoid(3);
      let uidList = await User.find().select("uid");
      while(uidList.includes(uid)){
        uid = nanoid(3);
      }
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				prev_pass: req.body.password,
				uid: uid,
			});
			const data = {
				user: {
					id: user.id,
				},
			};
			const authtoken = jwt.sign(data, JWT_SECRET);

			const email_data = {
				from: "Welcome User <welcome@faq.com>",
				to: req.body.email,
				subject: "Welcome To FAQ",
				text: "The user has been created successfully",
			};
			mg.messages().send(email_data, function (error, body) {
				console.log(body);
			});

			res.json({ success: "true", authtoken });

			// res.json(user);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
  }
);

//ROUTE 2: Authenticate a User using: POST "api/auth/login". No login required
router.post(
	"/login",
	[
		body("email", "Enter a valid email").isEmail(),
		body("password", "Password cannot be blank").exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		let success = false;
		if (!errors.isEmpty()) {
			return res.status(400).json({ success, errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({
						success,
						error: "Please try to login with correct Credentials",
					});
			}
			if (password !== user.password) {
				return res
					.status(400)
					.json({
						success,
						error: "Please try to login with correct Credentials",
					});
			}
			const data = {
				user: {
					id: user.id,
				},
			};
			const authtoken = jwt.sign(data, JWT_SECRET);
			res.json({ success: "true", authtoken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}
);

//ROUTE 3: Getting Loggedin User's Details: POST "api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
	try {
		const userId = req.user.id;
		// Gettting everything from user except the password
		const user = await User.findById(userId).select("-password -prev_pass");
		res.send(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});

//ROUTE 4: Change Password api/auth/changePass
router.put(
	"/changepass/",
	fetchuser,
	// [
	//   body("email").isEmail(),
	//   body("password").isLength({ min: 5 }),
	//   body("new-password").isLength({ min: 5 }),
	// ],
	async (req, res) => {
		//   const errors = validationResult(req);
		const { password, new_password } = req.body;
		console.log(req.param);

		// res.json({"msg":"done"})
		try {
			const userId = req.user.id;
			// Gettting everything from user except the password
			let user = await User.findById(userId);
			const updateUser = {};
			if (user.password === password) {
        if(!user.prev_pass.includes(new_password)){

          updateUser.password = new_password;
          updateUser.prev_pass = user.prev_pass;
          updateUser.prev_pass.push(new_password);
          if(updateUser.prev_pass.length > 3){
            updateUser.prev_pass = updateUser.prev_pass.slice(1);
          }
  
          user = await User.findByIdAndUpdate(
            userId,
            { $set: updateUser },
            { new: true }
          );
          return res.json({ message: "Successfully Updated" });
        } else{
          return res.status(400).json({message: "Cannot Update with the previous 3 passwords"})
        }
			} else {
        return res.status(400).json({message: "Cannot Update as the previous password in incorrect"});
      }
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}
);

module.exports = router;
