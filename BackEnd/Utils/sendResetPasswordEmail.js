const nodemailer = require('nodemailer');
const catchAsyncError = require('../MiddleWare/catchAsyncError');

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

module.exports = sendEmail;