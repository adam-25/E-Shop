/*
	Date: May 29, 2022
		* Payment Route.
*/

// Importing necessary files.
const express = require('express');
const { isAuthenticateUser } = require('../MiddleWare/Authentication');
const payment = require('../Controllers/paymentController');
const router = express.Router();

// Route where payment can be posted.
router.route("/payment/processPayment").post(isAuthenticateUser, payment.processPayment);

router.route("/stripeAPIKey").get(isAuthenticateUser, payment.sendStripeAPIKey);

module.exports = router;