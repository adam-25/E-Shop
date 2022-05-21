import {
	FORGOT_PASSWORD_REQUEST ,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	CLEAR_ERRORS,
} from "../Constants/forgotPasswordConstant";

export const forgotPasswordReducer = (state = {}, action) => {

	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
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
		case FORGOT_PASSWORD_FAIL:
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