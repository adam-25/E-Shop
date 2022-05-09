/*
	Date: May 8, 2022
		* Handle Async try catch errors..
*/

module.exports = funcErrorHandler => (req, res, next) => {
	Promise.resolve(funcErrorHandler(req, res, next)).catch(next);
};