/*
	Date: May 31, 2022
		* Creating Reducer for admin for users.

	Date: June 2, 2022
		* Creating Reducer for admin to delete or update a user.
*/

// Importing necessary constants.
import {
	ADMIN_ALL_USERS_REQUEST,
	ADMIN_ALL_USERS_SUCCESS,
	ADMIN_ALL_USERS_FAILURE,
	ADMIN_DELETE_USER_REQUEST,
	ADMIN_DELETE_USER_SUCCESS,
	ADMIN_DELETE_USER_FAILURE,
	ADMIN_DELETE_USER_RESET,
	ADMIN_UPDATE_USER_REQUEST,
	ADMIN_UPDATE_USER_SUCCESS,
	ADMIN_UPDATE_USER_FAILURE,
	ADMIN_UPDATE_USER_RESET,
	CLEAR_ERRORS

} from "../../Constants/Admin/adminUsersConstants";

// Admin to get all users reducer.
export const adminAllUsersReducer = (state = { users: [], totalUsers: 0 }, action) => {

	switch (action.type) {

		case ADMIN_ALL_USERS_REQUEST:
			return {
				...state,
				loading: true,
			};

		case ADMIN_ALL_USERS_SUCCESS:
			return {
				loading: false,
				users: action.payload.users,
			};

		case ADMIN_ALL_USERS_FAILURE:
			return {
				loading: false,
				error: action.payload
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};

		default:
			return state;
	}
}

export const adminDeleteUpdateUserReducer = (state = { status: false }, action) => {
	switch (action.type) {
		case ADMIN_DELETE_USER_REQUEST:
		case ADMIN_UPDATE_USER_REQUEST:
			return {
				...state,
				loading: true
			};
		case ADMIN_DELETE_USER_SUCCESS:
		case ADMIN_UPDATE_USER_SUCCESS:
			return {
				loading: false,
				status: action.payload.status
			};
		case ADMIN_DELETE_USER_FAILURE:
		case ADMIN_UPDATE_USER_FAILURE:
			return {
				loading: false,
				error: action.payload
			};
		case ADMIN_DELETE_USER_RESET:
		case ADMIN_UPDATE_USER_RESET:
			return {
				loading: false,
				status: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
}