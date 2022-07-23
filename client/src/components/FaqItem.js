import React, { useState,useRef } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import {updateFaqs,deleteFaqs} from "../redux/features/faqSlice";

import { useSelector, useDispatch } from 'react-redux';

const FaqItem = (props) => {
	const [modal, setModal] = useState(false);
	const dispatch = useDispatch();
	const catIdRef = useRef();
	const catNameRef = useRef();
	const questionRef = useRef();
	const answerRef = useRef();
	const {authToken} = useSelector((state)=>state.user);
	const handleDelete = (e) => { 
		e.preventDefault();
		dispatch(deleteFaqs({authToken:authToken,id:props.id}))
	 }

	 const updateHandler = (e) => { 
		e.preventDefault();
		dispatch(updateFaqs({authToken:authToken,id:props.id,question: questionRef.current.value,answer: answerRef.current.value,cat_name: catNameRef.current.value,cat_id: catIdRef.current.value}));
		setModal(false);

	  }

	return (
		<div>
			<h1 className="text-xl font-semibold">{props.question}</h1>
			<p className="text-gray-600">{props.answer}</p>
			<div className="flex left-5">
				<button onClick={()=>setModal(true)}>
					<BiEdit className="text-blue-500"/>
				</button>
				<button onClick={handleDelete}>
					<AiOutlineDelete className="text-blue-500" />
				</button>
			</div>
            {modal && (
				<div className="container flex-col w-[75vw] mt-5 m-auto bg-blue-300 opacity-80 absolute inset-0 rounded-lg">
				<h1 className="text-xl font-bold flex justify-center mt-5">Edit the FAQ</h1>
				<section className="text-black body-font relative">
					<div className="container px-5 py-24 mx-auto">
						<div className="lg:w-1/2 md:w-2/3 mx-auto">
							<div className="flex flex-wrap -m-2">
								<div className="p-2 w-full">
									<div className="relative">
										<label
											htmlFor="cat_name"
											className="leading-7 text-sm text-black">
											Category Name
										</label>
										<input
											type="text"
											id="cat_name"
											name="cat_name"
											ref={catNameRef}
											className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
											defaultValue={props.cat_name}
											
										/>
									</div>
								</div>
								<div className="p-2 w-full">
									<div className="relative">
										<label
											htmlFor="cat_id"
											className="leading-7 text-sm text-black">
											Category ID
										</label>
										<input
											type="text"
											id="cat_id"
											name="cat_id"
											ref={catIdRef}
											className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
											defaultValue={props.cat_id}
										/>
									</div>
								</div>
								<div className="p-2 w-full">
									<div className="relative">
										<label
											htmlFor="question"
											className="leading-7 text-sm text-black">
											Question
										</label>
										<input
											type="text"
											id="question"
											name="question"
											ref={questionRef}
											className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
											defaultValue={props.question}
										/>
									</div>
								</div>
								<div className="p-2 w-full">
									<div className="relative">
										<label
											htmlFor="answer"
											className="leading-7 text-sm text-black">
											Answer
										</label>
										<textarea
											id="answer"
											name="answer"
											ref={answerRef}
											className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
											defaultValue={props.answer}></textarea>
									</div>
								</div>
								<div className="p-2 flex space-x-5">
									<button onClick={updateHandler} className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
										Save
									</button>
									<button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
									onClick={()=>setModal(false)}
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			)}
		</div>
	);
};

export default FaqItem;
