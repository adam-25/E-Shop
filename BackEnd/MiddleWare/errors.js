/*
	Date: May 8, 2022
		* Handles MongoDB ID errors and others.
*/ 

// Importing necessary files.
const ErrorHandler = require("../Utils/errorHandler");

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";

	// Wrong MongoDB ID error.
	if (err.name === "CastError") {
		const message = "ID is not a valid MongoDB ID: " + err.path;

		err = new ErrorHandler(message, 400);
	}

	res.status(err.statusCode).json({success: false, message: err.message});
}