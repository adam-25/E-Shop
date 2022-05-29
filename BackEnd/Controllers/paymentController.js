/*
	Date: May 28, 2022
		* Add Payment Controller.
*/

const catchAsyncError = require('../Middleware/catchAsyncError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process the payment.
exports.processPayment = catchAsyncError(async (req, res, next) => {
	const payment = await stripe.paymentIntents.create({
		amount: req.body.amount,
		currency: 'cad',
		metadata: {
			company: "E-Shop"
		}
	});

	res.status(200).json({ success: true, client_secret: payment.client_secret });
});

// Sending Stripe API ket to client.
exports.sendStripeAPIKey = (req, res, next) => {
	res.status(200).json({
		success: true,
		stripe_api_key: process.env.STRIPE_KEY
	});
}