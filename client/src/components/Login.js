import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const emailRef = useRef();
	const passRef = useRef();
	const {isLoggedIn,authToken} = useSelector((state) => state.user);
	const dispatch = useDispatch();
	let navigate = useNavigate();

	useEffect(() => {
	  if(isLoggedIn && authToken){
		navigate("/faq")
	  }
	}, [isLoggedIn,authToken])
	

	const handleLogin = async (e) => {
		e.preventDefault();
		dispatch(getUser({email:emailRef.current.value,password:passRef.current.value}))		
	};
	return (
		<div className="container px-5 py-5 flex flex-wrap items-center mx-auto mt-32">
			<div className="rounded-lg p-8 flex flex-col mt-24 md:mt-0 mx-auto md:w-1/2">
				<h1 className="text-gray-900 text-xl font-bold title-font mb-5">
					Login
				</h1>
				<div className="relative mb-4">
					<label
						htmlFor="email"
						className="leading-7 text-sm text-gray-600">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						ref={emailRef}
						className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
				</div>
				<div className="relative mb-4">
					<label
						htmlFor="password"
						className="leading-7 text-sm text-gray-600">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						ref={passRef}
						className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
				</div>
				<button
					onClick={handleLogin}
					className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
					Login
				</button>
			</div>
		</div>
	);
};

export default Login;
