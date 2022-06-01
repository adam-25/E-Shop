/*
	Date: May 31, 2022
		* Created Action for admin to get All Users.
*/

// Importing necessary constants.
import {
	ADMIN_ALL_USERS_REQUEST,
	ADMIN_ALL_USERS_SUCCESS,
	ADMIN_ALL_USERS_FAILURE
} from "../../Constants/Admin/adminUsersConstants";

// Importing axios for making API calls.
import axios from "axios";

// Get All Users by Admin Action.
export const adminAllUsers = () => async (dispatch) => {
	try {
		// Request to get all Users.
		dispatch({ type: ADMIN_ALL_USERS_REQUEST });

		// Get all users data.
		const { data } = await axios.get("/api/v1/admin/allUsers");

		// Dispatching success action.
		dispatch({
			type: ADMIN_ALL_USERS_SUCCESS,
			payload: data
		});
	} catch (error) {
		// Dispatching failure action.
		dispatch({
			type: ADMIN_ALL_USERS_FAILURE,
			payload: error.response.data.error
		});
	}
}

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};