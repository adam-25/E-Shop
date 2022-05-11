/* 	
	File: Save cookie of login.
	Date: May 10, 2022.
		* Save cookie of a login Token.
*/

const sendToken = (user, statusCode, res) => {

	const token = user.getJWTToken();

	res.status(statusCode).cookie("Token", token, {
		expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
	}).json({ success: true, user, token});
};

module.exports = sendToken;