const express = require('express');
const router = express.Router();
const user = require('../Controllers/userController');

router.route("/Register").post(user.registerUser);
router.route("/Login").get(user.loginUser);
router.route("/logout").get(user.logOutUser);
router.route("/password/reset").post(user.forgotPassword)

module.exports = router;