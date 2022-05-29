// Class which takes error message and status code and prints the error trace tree.
class ErrorHandler extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = ErrorHandler; 