const express = require('express');
const router = express.Router();
const user = require('../Controllers/userController');

router.route("/Register").post(user.registerUser);

module.exports = router;