import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOADING_REQUEST,
	LOADING_SUCCESS,
	LOADING_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	CLEAR_ERRORS
} from "../Constants/userConstant";

export const userReducer = (state = { user: {} }, action) => {

	switch (action.type) {
		case LOGIN_REQUEST:
		case REGISTER_REQUEST:
		case LOADING_REQUEST:
			return {
				loading: true,
				isAuthenticateUser: false
			}
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
		case LOADING_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthenticateUser: true,
				user: action.payload.user
			}
		case LOGIN_FAIL:
		case REGISTER_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
				isAuthenticateUser: false,
				user: null
			}
		case LOADING_FAIL:
			return {
				loading: false,
				error: action.payload,
				isAuthenticateUser: false,
				user: null
			}
		case LOGOUT_SUCCESS:
			return {
				loading: false,
				user: null,
				isAuthenticateUser: false,
			}
		case LOGOUT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
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