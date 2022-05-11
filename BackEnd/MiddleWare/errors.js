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

	// MongoDB duplicate key error.
	if (err.code === 11000) {
		const message = "Duplicate "+ Object.keys(err.keyValue) +" Entered.";

		err = new ErrorHandler(message, 400);
	}

	// JWT Web Token error.
	if (err.name === "JsonWebTokenError") {
		const message = "JsonWebTokenError is invalid. Please try again.";
		err = new ErrorHandler(message, 400);
	};

	// JWT Got expired
	if (err.name === "TokenExpiredError") {
		const message = "JWT web Token has been expired. Please try again.";
		err = new ErrorHandler(message, 400);
	};

	res.status(err.statusCode).json({success: false, message: err.message});
}