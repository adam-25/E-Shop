/* 	
	File: function that send an Email.
	Date: May 10, 2022.
		* Send an Email to the email provided by the user from the email stored in .env file.
*/

// Importing necessary files.
const nodemailer = require('nodemailer');
const catchAsyncError = require('../MiddleWare/catchAsyncError');


// Send an email with this function.
const sendEmail = catchAsyncError(async (emailOptions) => {

	const transporter = nodemailer.createTransport({
		host: process.env.SMPT_HOST,
		PORT: process.env.GMAIL_PORT,
		service: process.env.SERVICE,
		auth: {
			user: process.env.MY_EMAIL,
			pass: process.env.MY_PASSWORD
		}
	});

	const mailOptions = {
		from: process.env.MY_EMAIL,
		to: emailOptions.email,
		subject: emailOptions.subject,
		text: emailOptions.message
	};

	await transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log("There is an error while sending an email: " + error.message);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});

});

// Exporting sendEmail function.
module.exports = sendEmail;