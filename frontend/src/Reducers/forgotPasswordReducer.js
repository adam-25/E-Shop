/*	
	Date: May 21, 2022
		* Forgot password Reducer.
		* Update action to RESET password in reducer.
*/

// Importing all Constants required.
import {
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
	CLEAR_ERRORS,
} 
from "../Constants/forgotPasswordConstant";

// Forgot password Reducer.
export const forgotPasswordReducer = (state = {}, action) => {

	switch (action.type) {

		// FORGOT, RESET PASSWORD request.
		case FORGOT_PASSWORD_REQUEST:
		case RESET_PASSWORD_REQUEST:
			return {
				...state,
				loadingProfile: true,
				error: null
			}
		// FORGOT password success.
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				loadingProfile: false,
				message: action.payload.message
			}
		// RESET PASSWORD success.
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				loadingProfile: false,
				success: action.payload.success
			}
		
		// FORGOT, RESET PASSWORD fails.
		case FORGOT_PASSWORD_FAIL:
		case RESET_PASSWORD_FAIL:
			return {
				...state,
				loadingProfile: false,
				error: action.payload,
			}

		// CLEARING errors.
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			}
		default:
			return state;
	}
};