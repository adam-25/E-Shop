import {
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
	CLEAR_ERRORS,
} from "../Constants/forgotPasswordConstant";

export const forgotPasswordReducer = (state = {}, action) => {

	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
		case RESET_PASSWORD_REQUEST:
			return {
				...state,
				loadingProfile: true,
				error: null
			}
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				loadingProfile: false,
				message: action.payload.message
			}
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				loadingProfile: false,
				success: action.payload.success
			}
		case FORGOT_PASSWORD_FAIL:
		case RESET_PASSWORD_FAIL:
			return {
				...state,
				loadingProfile: false,
				error: action.payload,
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			}
		default:
			return state;
	}
};