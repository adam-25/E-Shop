/* 	
	File: User Routes.
	Date: May 10, 2022.
		* Add User routes.
*/

// Importing necessary files for route.
const express = require('express');
const router = express.Router();
const user = require('../Controllers/userController');
const { isAuthenticateUser } = require('../MiddleWare/Authentication');

// User routes.

// Register the user.
router.route("/Register").post(user.registerUser);

// Login the user.
router.route("/Login").get(user.loginUser);

// Logout the user.
router.route("/logout").get(user.logOutUser);

// Send reset password link to the user with email.
router.route("/password/forgot").post(user.forgotPassword);

// User set a new password.
router.route("/password/reset/:resetToken").put(user.newPassword);

router.route("/password/update").put(isAuthenticateUser, user.updatePassword);

router.route("/details").get(isAuthenticateUser, user.getUserDetails);

router.route("/details/updateProfile").put(isAuthenticateUser, user.updateDetails);

router.route("/password/update").post(user.updatePassword);

module.exports = router;