const mongoose = require("mongoose");
const { Schema } = mongoose;
const FaqSchema = new Schema({
	cat_id: {
		type: String,
		required: true,
	},
	cat_name: {
		type: String,
		default: "General",
	},
	question: {
		type: String,
		required: true,
	},
	answer: {
		type: String,
		required: true,
	},
	isVisible: {
		type: Boolean,
		default: true,
	},
});
const Faq = mongoose.model("faq", FaqSchema);
module.exports = Faq;