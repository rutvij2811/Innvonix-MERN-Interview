import React ,{useRef} from "react";

import { useDispatch, useSelector } from "react-redux";

import { changePass } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
	
	const passRef = useRef();
	const newPassRef = useRef();
	
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const {authToken} = useSelector((state) => state.user);


	const handlePasswordChange = async (e) => {
		e.preventDefault();
		dispatch(changePass({authToken:authToken,password:passRef.current.value,new_password: newPassRef.current.value}));
		
		setTimeout(() => {
			navigate("/faq");
		}, 1000);
	};

	return (
		<div className="container px-5 py-5 flex flex-wrap items-center mx-auto mt-32">
			<div className="rounded-lg p-8 flex flex-col mt-24 md:mt-0 mx-auto md:w-1/2">
				<h1 className="text-gray-900 text-xl font-bold title-font mb-5">
					Password Change
				</h1>
				
				<div className="relative mb-4">
					<label
						htmlFor="password"
						className="leading-7 text-sm text-gray-600">
						Old Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						ref={passRef}
						className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
				</div>
				<div className="relative mb-4">
					<label
						htmlFor="new_password"
						className="leading-7 text-sm text-gray-600">
						New Password
					</label>
					<input
						type="password"
						id="new_password"
						name="new_password"
						ref={newPassRef}
						className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
				</div>
				<button onClick={handlePasswordChange} className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
					Confirm Password Change
				</button>
			</div>
		</div>
	);
};

export default ChangePassword;
