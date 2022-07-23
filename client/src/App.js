import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChangePassword from "./components/ChangePassword";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Faq from "./components/Faq";
import Navbar from "./components/Navbar";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="changepassword" element={<ChangePassword />} />
				<Route path="faq" element={<Faq />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
