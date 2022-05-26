/*	
	Date: May 20, 2022
		* Creating User Profile updating reducer.
		* UPDATE NAME, EMAIL of user.

	Date: May 21, 2022
		* Update password Reducer.
		* When RESET password is done, change isUpdate to false again.
*/

// Importing all Constants required.
import {
	UPDATE_NAME_REQUEST,
	UPDATE_NAME_SUCCESS,
	UPDATE_NAME_FAIL,
	UPDATE_EMAIL_REQUEST,
	UPDATE_EMAIL_SUCCESS,
	UPDATE_EMAIL_FAIL,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAIL,
	UPDATE_EMAIL_RESET, 
	UPDATE_NAME_RESET,
	UPDATE_PASSWORD_RESET,
	CLEAR_ERRORS
} 
from "../Constants/profileConstants";

// Profile Reducer.
export const profileReducer = (state = {}, action) => {

	switch (action.type) {
		// UPDATE NAME, PASSWORD, EMAIL request.
		case UPDATE_NAME_REQUEST:
		case UPDATE_EMAIL_REQUEST:
		case UPDATE_PASSWORD_REQUEST:
			return {
				...state,
				loadingProfile: true,
			}

		// UPDATING NAME, EMAIL OR PASSWORD successful.
		case UPDATE_NAME_SUCCESS:
		case UPDATE_EMAIL_SUCCESS:
		case UPDATE_PASSWORD_SUCCESS:
			return {
				...state,
				loadingProfile: false,
				isUpdate: action.payload.success
			}
		
		// UPDATING NAME, EMAIL, PASSWORD fails.
		case UPDATE_NAME_FAIL:
		case UPDATE_EMAIL_FAIL:
		case UPDATE_PASSWORD_FAIL:
			return {
				...state,
				loadingProfile: false,
				error: action.payload,
			}

		// Making isUpdate false again after update is successful.
		case UPDATE_NAME_RESET:
		case UPDATE_EMAIL_RESET:
		case UPDATE_PASSWORD_RESET:
			return {
				...state,
				isUpdate: false
			}

		// Clearing errors.
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			}
		default:
			return state;
	}
};