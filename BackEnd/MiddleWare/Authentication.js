const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

exports.isAuthenticateUser = catchAsyncError (async (req, res, next) => {

	const {Token} = req.cookies;

	if (!Token) {
		return await next(new ErrorHandler("Please Login to access"), 401);
	}

	console.log("Hello");

	const decodedData = jwt.verify(Token, process.env.SECRET_KEY);

	req.user = await userModel.findById(decodedData.id);

	next();

});