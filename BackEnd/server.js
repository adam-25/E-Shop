/*
	Date: May 8, 2022
		* Main Server of the project.
		* Handle Errors like uncaughtException and unhandledRejection.
*/

// Importing necessary files.
const app = require('./app');
const dotenv = require('dotenv');
const mongoConnection = require('./Database/connectDB');

// Handling uncaught exceptions. Handle errors when you use undefined variables.
process.on('uncaughtException', (err) => {
	console.log("Uncaught exception: " + err.message);

	console.log("Shutting down the server due to an error: " + err.message);

	process.exit(1);

});

// Configuration of env file.
dotenv.config({ path: "BackEnd/Config/config.env" });

// Connecting to database
mongoConnection();

// Server listening on port.
const server = app.listen(process.env.PORT, (err) => {
	if (err) {
		console.log("There is an error Connectiong to Server: " + err.message);
	}
	else {
		console.log("Server listening on port " + process.env.PORT);
	}
});

// UnHandle Promise Rejection: Only one thing happens at promise time.
process.on("unhandledRejection", (err) => {
	console.log("There is an unhandled Error: " + err.message);

	console.log("Shutting down the server due to an error: " + err.message);

	server.close(() => {
		process.exit(1);
	});
});