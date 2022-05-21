 import { UPDATE_EMAIL_RESET, UPDATE_NAME_RESET } from "../Constants/profileConstants";
import {
	UPDATE_NAME_REQUEST,
	UPDATE_NAME_SUCCESS,
	UPDATE_NAME_FAIL,
	UPDATE_EMAIL_REQUEST,
	UPDATE_EMAIL_SUCCESS,
	UPDATE_EMAIL_FAIL,
	CLEAR_ERRORS
} from "../Constants/profileConstants";

export const profileReducer = (state = {}, action) => {

	switch (action.type) {
		case UPDATE_NAME_REQUEST:
		case UPDATE_EMAIL_REQUEST:
			return {
				...state,
				loadingProfile: true,
			}
		case UPDATE_NAME_SUCCESS:
		case UPDATE_EMAIL_SUCCESS:
			return {
				...state,
				loadingProfile: false,
				isUpdate: action.payload.success
			}
		case UPDATE_NAME_FAIL:
		case UPDATE_EMAIL_FAIL:
			return {
				...state,
				loadingProfile: false,
				error: action.payload,
			}
		case UPDATE_NAME_RESET:
		case UPDATE_EMAIL_RESET:
			return {
				...state,
				isUpdate: false
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