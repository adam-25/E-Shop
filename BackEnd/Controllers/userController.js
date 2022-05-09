/*
	Date: May 8, 2022
		* Controls user Registration, Login and Authenticate Users.
*/

// Importing necessary files.
const catchError = require('../MiddleWare/catchAsyncError');
const userModel = require('../Models/userModel');
const ErrorHandler = require('../Utils/errorHandler');
const sendToken = require('../Utils/returnToken');

exports.registerUser = catchError( async (req, res, next) => {

	const {userFullName, userEmail, userPassword} = req.body;

	const user = await userModel.create({userFullName, userEmail, userPassword});

	sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchError( async (req, res, next) => {

	const {userEmail, userPassword} = req.body;

	if (!userEmail || !userPassword) {
		return next(new ErrorHandler("Please Enter 	your email and password", 400));
	};

	const user = await userModel.findOne({userEmail: userEmail}).select("+userPassword");

	if (!user)	{
		next(new ErrorHandler("Invalid Email or password", 401));
	}

	const passwordMatch = user.comparePassword(userPassword);

	if (!passwordMatch) {
		return next(new ErrorHandler("Invalid Email or Password", 400));
	}

	sendToken(user, 200, res);
});