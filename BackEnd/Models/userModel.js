/* 	
	File: User Information.
	Date: May 8, 2022.
		* Schema of the user Information when they create an Account.
*/

// Importing necessary files for route.
const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


const userSchema = new mongoose.Schema({
	userFullName: {
		type: String,
		required: [true, "Please Enter Your Name"],
		maxLength: [30, "Name must be less than 30 characters"],
		minLength: [4, "Please must be at least 5 characters"]
	},
	userEmail: {
		type: String,
		required: [true, "Please Enter Your Email"],
		unique: true,
		validate: [validate.isEmail, "Please Enter Valid Email"],
	},
	userPassword: {
		type: String,
		required: [true, "Please Enter Your Password"],
		minLength: [6, "Password must be at least 6 characters"],
		select: false
	},
	userRole: {
		type: String,
		default: "user"
	},
	resetPasswordToken: String,

	resetPasswordExpiredDate: Date
});

// Hashing the password and store in DB.
userSchema.pre("save", async function (next) {

	if (!this.isModified("password")) {
		next();
	}

	this.userPassword = await bcrypt.hash(this.userPassword, saltRounds);
});

// JWT Token We store it in Cookie so, we can know that this is the same user that has been logged in.
userSchema.methods.getJWTToken = function () {
	return this.sign({ id: this._id }, process.env.SECRET_KEY,
		{ expiresIn: process.env.JWT_EXPIRE }
	);
};

module.exports = new mongoose.model("userInfo", userSchema);