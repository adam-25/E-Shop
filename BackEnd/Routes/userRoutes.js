/* 	
	File: User Routes.
	Date: May 10, 2022.
		* Add User routes.
*/

// Importing necessary files for route.
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const user = require('../Controllers/userController');
const { isAuthenticateUser, isAdmin } = require('../MiddleWare/Authentication');

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

router.route("/admin/allUsers").get(isAuthenticateUser, isAdmin("admin"), user.getAllUsers);

router.route("/admin/singleUser/:id")
.get(isAuthenticateUser, isAdmin("admin"), user.getOneUser)
.delete(isAuthenticateUser, isAdmin("admin"), user.deleteUserByAdmin)
.put(isAuthenticateUser, isAdmin("admin"), user.updateUserRole);


router.route("/deleteUser").delete(isAuthenticateUser, user.deleteUser);

module.exports = router;