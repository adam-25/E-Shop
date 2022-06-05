/*
	Date: May 8, 2022
		* Controls user Registration, Login and Authenticate Users.
	
	Date: May 10, 2022
		* Send email to reset the user password.

	Date: May 11, 2022
		* Save the new password that user has been entered.
		* Delete, Update, user details by them.
		* Delete, Update, Get users detail by admin.
*/

// Importing necessary files.
const catchError = require('../MiddleWare/catchAsyncError');
const userModel = require('../Models/userModel');
const ErrorHandler = require('../Utils/errorHandler');
const sendToken = require('../Utils/returnToken');
const sendEmail = require('../Utils/sendResetPasswordEmail.js');
const crypto = require('crypto');

exports.registerUser = catchError(async (req, res, next) => {

	let { userFullName, userEmail, userPassword } = req.body;

	if (userFullName.trim().split(' ').length !== 2)
		return next(new ErrorHandler("Please enter name with two words: 'FirstName LastName'", 500))

	userFullName = userFullName.trim().split(' ')[0].charAt(0).toUpperCase() + userFullName.trim().split(' ')[0].slice(1) + ' ' + userFullName.trim().split(' ')[1].charAt(0).toUpperCase() + userFullName.trim().split(' ')[1].slice(1);
	const userFirstName = userFullName.trim().split(" ")[0].charAt(0).toUpperCase() + userFullName.trim().split(" ")[0].slice(1);
	const userLastName = userFullName.trim().split(" ")[1].charAt(0).toUpperCase() + userFullName.trim().split(" ")[1].slice(1);

	const user = await userModel.create({ userFullName, userFirstName, userLastName, userEmail, userPassword });

	sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchError(async (req, res, next) => {

	const { userEmail, userPassword } = req.body;

	if (!userEmail || !userPassword) {
		return next(new ErrorHandler("Please Enter your email and password", 401));
	};

	const user = await userModel.findOne({ userEmail: userEmail }).select("+userPassword");

	if (!user) {
		return next(new ErrorHandler("Invalid Email or Password", 401));
	}

	const passwordMatch = await user.comparePassword(userPassword);

	if (!passwordMatch) {
		return next(new ErrorHandler("Invalid Email or Password", 401));
	}

	sendToken(user, 200, res);
});

// Logout User by setting stored LogIn Cookie to null.
exports.logOutUser = catchError(async (req, res, next) => {

	res.cookie("Token", null, { httpOnly: true, expires: new Date(Date.now()) });

	res.status(200).json({ success: true, message: "LogOut" });

});

// If User forgot password and Enter correct Email ID then send a reset password link to the user.
exports.forgotPassword = catchError(async (req, res, next) => {

	const user = await userModel.findOne({ userEmail: req.body.userEmail });

	if (!user) {
		return next(new ErrorHandler("Invalid Email ID to reset a password"), 404);
	}

	const resetPasswordToken = await user.resetPassword();

	await user.save({ validateBeforeSave: false });

	const URLToResetPassword = `${req.protocol}://${req.get("host")}/password/reset/${resetPasswordToken}`;

	const message = "Your Password reset Token has been generated."
		+ "Click the link below to reset your password. \n\n" + URLToResetPassword
		+ "\n\nThis Link will be expired in 15 minutes.\n"
		+ "If you have not request for Reset Password, Please ignore this Email."

	try {

		await sendEmail({
			email: user.userEmail,
			subject: "E-Shop Account Reset Password",
			message: message
		});

		res.status(200).json({ status: "Success", message: "Email sent to " + user.userEmail + " successfully" });

	}
	catch (err) {

		user.resetPasswordToken = undefined;
		user.resetPasswordExpiredDate = undefined;

		user.save({ validateBeforeSave: false });

		return next(new ErrorHandler(err.message, 500));
	}

});

// Reset Password. Add new Password to Database.
exports.newPassword = catchError(async (req, res, next) => {

	const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

	const user = await userModel.findOne({ resetPasswordToken, resetPasswordExpiredDate: { $gt: Date.now() } });

	if (!user) {
		return next(new ErrorHandler("Password Reset Token is invalid or expired"), 400);
	}

	if (req.body.newPassword !== req.body.confirmNewPassword) {
		return next(new ErrorHandler("Password Does not Match"), 400);
	}

	user.userPassword = req.body.newPassword;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpiredDate = undefined;

	await user.save();

	sendToken(user, 200, res);

});

// Get all the details of the user by login id.
exports.getUserDetails = catchError(async function (req, res, next) {

	const getUserById = await userModel.findById(req.user.id);

	res.status(200).json({ status: true, user: getUserById });

});

// Update password of the user while he is logged in.
exports.updatePassword = catchError(async function (req, res, next) {

	const user = await userModel.findById(req.user.id).select("+userPassword");

	const passwordMatch = await user.comparePassword(req.body.oldPassword);

	if (!passwordMatch) {
		return next(new ErrorHandler("Old Password is not correct.", 400));
	}

	if (req.body.oldPassword === req.body.newPassword) {
		return next(new ErrorHandler("New password is the same as old Password.", 400));
	}

	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHandler("Password does not match...", 400));
	}

	user.userPassword = req.body.newPassword;

	await user.save();

	sendToken(user, 200, res);

});

// Update user name while he is logged in.
exports.updateName = catchError(async function (req, res, next) {

	const user = await userModel.findById(req.user.id);

	if (req.body.newFullName.trim().split(' ').length !== 2)
		return next(new ErrorHandler("Please enter name with two words: 'FirstName LastName'", 500))

	user.userFullName = req.body.newFullName;

	user.userFirstName = user.userFullName.trim().split(" ")[0].charAt(0).toUpperCase() + user.userFullName.trim().split(" ")[0].slice(1);
	user.userLastName = user.userFullName.trim().split(" ")[1].charAt(0).toUpperCase() + user.userFullName.trim().split(" ")[1].slice(1);

	await user.save();

	res.status(200).json({ success: true, message: "User Name updated successfully" });
});

// Update user email while he is logged in.
exports.updateEmail = catchError(async function (req, res, next) {

	const user = await userModel.findById(req.user.id);

	user.userEmail = req.body.newEmail;

	await user.save();

	res.status(200).json({ success: true, message: "User Email updated successfully" });
});

// Get all the users -- ADMIN
exports.getAllUsers = catchError(async (req, res, next) => {

	const users = await userModel.find();

	res.status(200).json({ success: true, users: users });

});

// Get specific user -- ADMIN
exports.getOneUser = catchError(async (req, res, next) => {

	const user = await userModel.findById(req.params.id);

	if (!user)
		return next(new ErrorHandler("User not exist with id " + req.params.id));

	res.status(200).json({ success: true, user: user });

});

// Updating user role -- ADMIN
exports.updateUserRole = catchError(async (req, res, next) => {

	const user = await userModel.findById(req.params.id);

	if (!user)
		return next(new ErrorHandler("User not exist with id " + req.params.id));

	if (!req.body.newFullName)
		req.body.newFullName = user.userFullName;
	else {
		if (req.body.newFullName.trim().split(' ').length !== 2)
			return next(new ErrorHandler("User not exist with id " + req.params.id));
		
		user.userFullName = req.body.newFullName;
		user.userFirstName = req.body.newFullName.trim().split(" ")[0].charAt(0).toUpperCase() + req.body.newFullName.trim().split(" ")[0].slice(1);
		user.userLastName = req.body.newFullName.trim().split(" ")[1].charAt(0).toUpperCase() + req.body.newFullName.trim().split(" ")[1].slice(1);
	}

	if (!req.body.newEmail)
		req.body.newEmail = user.userEmail;
	else
		user.userEmail = req.body.newEmail;

	if (!req.body.newRole)
		req.body.newRole = user.userRole;
	else
		user.userRole = req.body.newRole;

	await user.save();

	res.status(200).json({ status: true });

});

// Delete user account while he is logged in.
exports.deleteUser = catchError(async (req, res, next) => {

	await userModel.deleteOne({ _id: req.user.id });

	res.status(200).send({ status: true });
});

// Delete user -- ADMIN
exports.deleteUserByAdmin = catchError(async (req, res, next) => {

	const user = await userModel.findById(req.params.id);

	if (!user) {
		return next(new ErrorHandler("User not exist with id " + req.params.id));
	}

	await userModel.deleteOne({ _id: req.params.id });

	res.status(200).send({ success: true, message: "User has been deleted successfully." });

});