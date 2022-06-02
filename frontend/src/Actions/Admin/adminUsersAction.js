/*
	Date: May 31, 2022
		* Created Action for admin to get All Users.

	Date: June 2, 2022
		* Created Action for admin to delete or update users.
*/

// Importing necessary constants.
import {
	ADMIN_ALL_USERS_REQUEST,
	ADMIN_ALL_USERS_SUCCESS,
	ADMIN_ALL_USERS_FAILURE,
	ADMIN_DELETE_USER_REQUEST,
	ADMIN_DELETE_USER_SUCCESS,
	ADMIN_DELETE_USER_FAILURE,
	ADMIN_UPDATE_USER_REQUEST,
	ADMIN_UPDATE_USER_SUCCESS,
	ADMIN_UPDATE_USER_FAILURE,
	CLEAR_ERRORS
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

// Admin Delete User Action.
export const adminDeleteUser = (userId) => async (dispatch) => {
	try {
		// Request to delete a user.
		dispatch({ type: ADMIN_DELETE_USER_REQUEST });

		// Delete a user.
		const { data } = await axios.delete(`/api/v1/admin/singleUser/${userId}`);

		// Dispatching success action.
		dispatch({
			type: ADMIN_DELETE_USER_SUCCESS,
			payload: data
		});
	} catch (error) {
		// Dispatching failure action.
		dispatch({
			type: ADMIN_DELETE_USER_FAILURE,
			payload: error.response.data.error
		});
	}
};

// Admin Update User Action.
export const adminUpdateUser = (userId, userData) => async (dispatch) => {
	try {
		// Request to update a user.
		dispatch({ type: ADMIN_UPDATE_USER_REQUEST });

		const config = {headers : {"Content-Type" : "application/json"}};

		// Update a user.
		const { data } = await axios.put(`/api/v1/admin/singleUser/${userId}`, userData, config);

		// Dispatching success action.
		dispatch({
			type: ADMIN_UPDATE_USER_SUCCESS,
			payload: data
		});
	} catch (error) {
		// Dispatching failure action.
		dispatch({
			type: ADMIN_UPDATE_USER_FAILURE,
			payload: error.response.data.error
		});
	}
}

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};