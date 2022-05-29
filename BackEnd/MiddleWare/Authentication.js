// Authenticate user with JWT token.

const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

// Check user is Authenticated or not.
exports.isAuthenticateUser = catchAsyncError(async (req, res, next) => {

	// Get token stored in cookies.
	const { Token } = req.cookies;

	// If there is no error then ask to login.
	if (!Token) {
		return await next(new ErrorHandler("Please Login to access this resources", 401));
	}

	// if there is token then verify it.
	const decodedData = jwt.verify(Token, process.env.SECRET_KEY);

	// After verifying the token finding user in DB.
	req.user = await userModel.findById(decodedData.id);

	next();

});

// Checking user is admin or not.
exports.isAdmin = (roles) => {

	// roles === "admin"
	return (req, res, next) => {
		
		roles = roles.toLowerCase();

		// Check the user role in DB.
		// If it is not the same then return error.
		if (roles !== req.user.userRole) {
			return next(new ErrorHandler("Not allowed to use this resources", 403));
		}

		next();
	};
};