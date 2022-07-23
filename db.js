const mongoose = require('mongoose');
require("dotenv").config();
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/faq";
const connectToMongo = () => {
    mongoose.connect(mongoURI, () =>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;