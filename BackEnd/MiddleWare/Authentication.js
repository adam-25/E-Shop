const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

exports.isAuthenticateUser = catchAsyncError(async (req, res, next) => {

	const { Token } = req.cookies;

	if (!Token) {
		return await next(new ErrorHandler("Please Login to access this resources"), 401);
	}

	const decodedData = jwt.verify(Token, process.env.SECRET_KEY);

	req.user = await userModel.findById(decodedData.id);

	next();

});

exports.isAdmin = (roles) => {

	return (req, res, next) => {
		
		if (roles !== req.user.userRole) {

			return next(new ErrorHandler("Not allowed to use this resources", 403));
		}
		next();
	};
};