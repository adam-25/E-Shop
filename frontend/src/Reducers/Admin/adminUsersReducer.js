/*
	Date: May 31, 2022
		* Creating Reducer for admin for users.
*/

// Importing necessary constants.
import {
	ADMIN_ALL_USERS_REQUEST,
	ADMIN_ALL_USERS_SUCCESS,
	ADMIN_ALL_USERS_FAILURE,

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