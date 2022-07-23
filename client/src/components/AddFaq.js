import React,{useRef} from "react";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {addFaq} from "../redux/features/faqSlice";

import { useDispatch,useSelector } from 'react-redux';
const AddFaq = (props) => {
	const dispatch = useDispatch();
	const catIdRef = useRef();
	const catNameRef = useRef();
	const questionRef = useRef();
	const answerRef = useRef();
	
	const {authToken} = useSelector((state)=>state.user);
	const handleAdd = (e) => { 
		e.preventDefault();
		dispatch(addFaq({authToken:authToken,question: questionRef.current.value,answer: answerRef.current.value,cat_name: catNameRef.current.value,cat_id: catIdRef.current.value}));
		props.setAddFaqShow(false);
	 }
	return (
		<div className="container flex-col w-[75vw] mt-5 m-auto bg-blue-300 opacity-80 fixed inset-0 rounded-lg">
			<div className="flex justify-center items-center mt-5">
			<h1 className="text-xl font-bold justify-center">Add a new FAQ</h1>
			<button onClick={()=> props.setAddFaqShow(false)}><AiOutlineCloseCircle className="right-5 top-5 absolute cursor-pointer text-xl hover:text-white"/></button>
			</div>
			<section className="text-gray-600 body-font relative">
				<div className="container px-5 py-24 mx-auto">
					<div className="lg:w-1/2 md:w-2/3 mx-auto">
						<div className="flex flex-wrap -m-2">
							<div className="p-2 w-full">
								<div className="relative">
									<label
										htmlFor="cat_name"
										className="leading-7 text-sm text-gray-600">
										Category Name
									</label>
									<input
										type="text"
										id="cat_name"
										name="cat_name"
										ref={catNameRef}
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									/>
								</div>
							</div>
							<div className="p-2 w-full">
								<div className="relative">
									<label
										htmlFor="cat_id"
										className="leading-7 text-sm text-gray-600">
										Category ID
									</label>
									<input
										type="text"
										id="cat_id"
										name="cat_id"
										ref={catIdRef}
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									/>
								</div>
							</div>
							<div className="p-2 w-full">
								<div className="relative">
									<label
										htmlFor="question"
										className="leading-7 text-sm text-gray-600">
										Question
									</label>
									<input
										type="text"
										id="question"
										name="question"
										ref={questionRef}
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									/>
								</div>
							</div>
							<div className="p-2 w-full">
								<div className="relative">
									<label
										htmlFor="answer"
										className="leading-7 text-sm text-gray-600">
										Answer
									</label>
									<textarea
										id="answer"
										name="answer"
										ref={answerRef}
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
								</div>
							</div>
							<div className="p-2 w-full">
								<button onClick={handleAdd} className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
									Add FAQ
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default AddFaq;
