import React, { useEffect, useState } from "react";
import AddFaq from "./AddFaq";
import FaqItem from "./FaqItem";
import { useSelector, useDispatch } from "react-redux";
import { getFaqs } from "../redux/features/faqSlice";

import { useNavigate } from "react-router-dom";

const Faq = () => {
	const [addFaqShow, setAddFaqShow] = useState(false);
	const { faqs, loading } = useSelector((state) => state.faq);
	const { isLoggedIn, authToken } = useSelector((state) => state.user);
	let navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!isLoggedIn && !authToken) {
			navigate("/login");
		}
		if (authToken) {
			dispatch(getFaqs({ authToken: authToken }));
		}
	}, [authToken, dispatch, isLoggedIn, navigate]);

	return (
		<div className="container flex-col w-[75vw] m-auto">
			<h1 className="text-2xl font-bold mt-14">FAQs</h1>
			<button
				onClick={() => setAddFaqShow(true)}
				className="bg-green-500 text-white rounded-lg p-2 my-6">
				Add FAQ
			</button>
			{faqs.map((item) => {
				return (
					<FaqItem
						key={item._id}
						question={item.question}
						answer={item.answer}
						cat_name={item.cat_name}
						cat_id={item.cat_id}
						id={item._id}
					/>
				);
			})}

			{addFaqShow && <AddFaq setAddFaqShow={setAddFaqShow} />}
		</div>
	);
};

export default Faq;
