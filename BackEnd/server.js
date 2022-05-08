/*
	Date: May 8, 2022
		* Main Server of the project.
*/ 

// Importing necessary files.
const app = require('./app');
const dotenv = require('dotenv');
const mongoConnection = require('./Config/connectDB');

// Configuration of env file.
dotenv.config({path: "BackEnd/Config/config.env"});

// Connecting to database
mongoConnection();

// Server listening on port.
app.listen(process.env.PORT, (err) => {
	if (err) {
		console.log("There is an error Connectiong to Server: " + err.message);
	}
	else {
		console.log("Server listening on port " + process.env.PORT);
	}
});