import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	
	const {isLoggedIn} = useSelector((state) => state.user);
	const dispatch = useDispatch();

	let navigate = useNavigate();
	const handleLogout = (e) => { 
		e.preventDefault();
		dispatch(logout());

		setTimeout(() => {
			navigate("/");
		}, 1000);
	 }
	return (
		<header className="bg-gray-600 text-white body-font">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<a
					href="/"
					className="flex title-font font-medium items-center hover:text-gray-900 mb-4 md:mb-0">
					<span className="ml-3 text-xl">Home</span>
				</a>
				<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
					{/* TODO Render the links dynamically */}
					{!isLoggedIn && (<><Link to="/login" className="mr-5 hover:text-gray-900">
						Login
					</Link>
					<Link to="/signup" className="mr-5 hover:text-gray-900">
						Signup
					</Link></>)}

					{/* Only render if isLoggedIn */}
					{isLoggedIn && (<><Link
						to="/changepassword"
						className="mr-5 hover:text-gray-900">
						Change Password
					</Link>
					<button
						onClick={handleLogout}	
						className="mr-5 hover:text-gray-900">
						Logout
					</button></>)}
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
