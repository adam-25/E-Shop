/*
	Date: May 21, 2022
		* Sending Email to reset the password.
		* Reset Password function that make a post request to backend.
*/

// Constants
import {
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
	CLEAR_ERRORS
} 
from "../Constants/forgotPasswordConstant";

// axios to Communicate with backend.
import axios from "axios";

// Make a post request to send reset password email with a link to reset password.
export const forgotPassword = (userEmail) => async (dispatch) => {

	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });

		const config = { headers: { "Content-Type": "application/json" } };

		// Making a post request to send reset password email with a link to reset password.
		const { data } = await axios.post("/api/v1/password/forgot", { userEmail: userEmail }, config);

		dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
	}
	catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload: error.response.data.message
		})
	}
}

// When user enter new password making a put request to update password in backend.
export const resetPassword = (resetToken, newPassword, confirmNewPassword) => async (dispatch) => {

	try {
		dispatch({ type: RESET_PASSWORD_REQUEST });

		const config = { headers: { "Content-Type": "application/json" } };

		// Put request to update password in DB through backend.
		const { data } = await axios.put("/api/v1/password/reset/" + resetToken, { 
			newPassword: newPassword, confirmNewPassword: confirmNewPassword }, 
			config);

		dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
	}
	catch (error) {
		dispatch({
			type: RESET_PASSWORD_FAIL,
			payload: error.response.data.message
		})
	}
}

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};