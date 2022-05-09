/*
	Date: May 8, 2022
		* Controls user Registration, Login and Authenticate Users.
*/

// Importing necessary files.
const catchError = require('../MiddleWare/catchAsyncError');
const userModel = require('../Models/userModel');

exports.registerUser = catchError( async (req, res, next) => {

	const {userFullName, userEmail, userPassword} = req.body;

	const user = await userModel.create({userFullName, userEmail, userPassword});

	const token = user.getJWTToken();

	res.status(200).json({success: true, user: token});
});