const express = require("express");
const router = express.Router();
const Faq = require("../models/Faq");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = process.env.JWT_SECRET;

// Create FAQ /api/faq/createfaq
router.post(
	"/createfaq",
	fetchuser,
	[
		body("cat_id").isNumeric(),
		body("cat_name").isLength({ min: 3 }),
		body("question").isLength({ min: 5 }),
		body("answer").isLength({ min: 5 }),
	],
	async (req, res) => {
		// console.log(req.body);
		const { cat_id, cat_name, question, answer } = req.body;
		let success = false;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success, errors: errors.array() });
		}

		// Check whether the user with this email exists already
		try {
			let faq = await Faq.findOne({ question: req.body.question });
			if (faq) {
				return res.status(400).json({
					success,
					error: "This question is already answered",
				});
			}
			// const salt = await bcrypt.genSalt(10);
			// const secPass = await bcrypt.hash(req.body.password, salt);
			//Create a new user
			faq = await Faq.create({
				cat_id: cat_id,
				cat_name: cat_name,
				question: question,
				answer: answer,
			});
			let faqList = await Faq.find({ isVisible: true });
			if (faqList) {
				return res.status(200).json(faqList);
			} else {
				return res.json(faq);
			}
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}
);

// Update FAQ /api/faq/updatefaq/:id
router.put("/updatefaq/:id", fetchuser, async (req, res) => {
	// console.log(req.body);
	const { cat_id, cat_name, question, answer } = req.body;
	// console.log(req.params);

	// Check whether the user with this email exists already
	try {
		let newFaq = {};
		if (cat_id) {
			newFaq.cat_id = cat_id;
		}
		if (cat_name) {
			newFaq.cat_name = cat_name;
		}
		if (question) {
			newFaq.question = question;
		}
		if (answer) {
			newFaq.answer = answer;
		}
		let faq = await Faq.findById(req.params.id);
		if (!faq) {
			return res.status(404).send("Not found");
		}

		faq = await Faq.findByIdAndUpdate(
			req.params.id,
			{ $set: newFaq },
			{ new: true }
		);
		let faqList = await Faq.find({ isVisible: true });
		if (faqList) {
			return res.status(200).json(faqList);
		} else {
			return res.json(faq);
		}
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Internal Server Error");
	}
});

// get faq /api/faq/getfaq
router.get("/getfaq", fetchuser, async (req, res) => {
	let faqList = await Faq.find({ isVisible: true });
	if (faqList) {
		return res.status(200).json(faqList);
	} else {
		return res.status(400).json({ err: "No faq in database" });
	}
});

// Soft delete /api/faq/deletefaq/id
router.put("/deletefaq/:id", fetchuser, async (req, res) => {
	try {
		let faq = await Faq.findById(req.params.id);
		if (!faq) {
			return res.status(404).send("Not found");
		}

		faq = await Faq.findByIdAndUpdate(
			req.params.id,
			{ $set: { isVisible: false } },
			{ new: true }
		);
		let faqList = await Faq.find({ isVisible: true });
		if (faqList) {
			return res.status(200).json(faqList);
		} else {
			return res.json(faq);
		}
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
