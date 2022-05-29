/* 	
	File: Save cookie of login.
	Date: May 10, 2022.
		* Save cookie of a login Token.
*/

const sendToken = (user, statusCode, res) => {

	// Get user JWT token.
	const token = user.getJWTToken();

	// user cookie token with expire date.
	res.status(statusCode).cookie("Token", token, {
		expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
	}).json({ success: true, user: user});
};

module.exports = sendToken;