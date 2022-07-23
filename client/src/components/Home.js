import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container mx-4 mt-20 md:w-1/2 flex flex-col justify-center md:mx-auto">
			<h1 className="text-2xl justify-center">FAQ and User DEMO</h1>
			<p className="my-20">
				Use the buttons below or on the Navbar to access the application
			</p>
			<div className="flex space-x-10">
				<Link to={"/login"}>
					<button className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
						Login
					</button>
				</Link>
				<Link to={"/signup"}>
					<button className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
						Signup
					</button>
				</Link>
			</div>
		</div>
  )
}

export default Home