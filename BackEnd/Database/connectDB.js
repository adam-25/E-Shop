/*
	Date: May 8, 2022
		* Connecting to main MongoDB Database.
*/ 

// Importing necessary files.
const mongoose = require('mongoose');

// Function that connect to MongoDB.
const connectMongo = () => {
	mongoose.connect(process.env.MONGO_CONNECT_URL)
	.then(() => console.log('Connected to MongoDB Database Successfully'));
};

module.exports = connectMongo;