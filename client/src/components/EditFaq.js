import React from "react";

const EditFaq = (props) => {
	const handleCloseClick = (e) => { 
		props.setModal(false);
	 }
	return (
		<div className="container flex-col w-[75vw] mt-5 m-auto bg-blue-300 opacity-80 fixed inset-0 rounded-lg">
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
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        value={props.cat_name}
										key={props.cat_name}
										
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
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        value={props.cat_id}
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
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        value={props.question}
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
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                        value={props.answer}></textarea>
								</div>
							</div>
							<div className="p-2 flex space-x-5">
								<button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
									Save
								</button>
								<button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
								onClick={handleCloseClick}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default EditFaq;
