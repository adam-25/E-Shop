/*
	Date: May 8, 2022
		* Main Server of the project.
		* Handle Errors like uncaughtException and unhandledRejection.

	Date: May 19, 2022
		* Adding Cloudinary to store images.
*/

// Importing necessary files.
const app = require('./app');
const mongoConnection = require('./Database/connectDB');
const cloudinary = require('cloudinary');

// Handling uncaught exceptions. Handle errors when you use undefined variables.
process.on('uncaughtException', (err) => {
	console.log("Uncaught exception: " + err.message);

	console.log("Shutting down the server due to an error: " + err.message);

	process.exit(1);

});

// Configuration of env file.

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config({ path: "BackEnd/Config/config.env" });
}
// Connect to Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET_KEY
})

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
	console.log("There is an unhandled Error: " + err.stack);

	console.log("Shutting down the server due to an error: " + err.message);

	server.close(() => {
		process.exit(1);
	});
});