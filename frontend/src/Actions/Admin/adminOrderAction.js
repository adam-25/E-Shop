/*
	Date: May 31, 2022
		* Created Action for admin to get All Orders.

	Date: June 1, 2022
		* Created Action for admin to update Orders.
		* Created Action for admin to delete Orders.
*/

// Importing necessary constants.
import {
	ADMIN_ALL_ORDER_REQUEST,
	ADMIN_ALL_ORDER_SUCCESS,
	ADMIN_ALL_ORDER_FAILURE,
	ADMIN_ORDER_UPDATE_REQUEST,
	ADMIN_ORDER_UPDATE_SUCCESS,
	ADMIN_ORDER_UPDATE_FAILURE,
	ADMIN_ORDER_DELETE_REQUEST,
	ADMIN_ORDER_DELETE_SUCCESS,
	ADMIN_ORDER_DELETE_FAILURE,
	CLEAR_ERRORS
} from "../../Constants/Admin/adminOrderConstants";

// Importing axios for making API calls.
import axios from "axios";

// Get All Orders  by Admin Action.
export const adminAllOrder = () => async (dispatch) => {
	try {


		dispatch({ type: ADMIN_ALL_ORDER_REQUEST });

		// Get all orders data.
		const { data } = await axios.get("/api/v1/admin/order");

		// Dispatching success action.
		dispatch({
			type: ADMIN_ALL_ORDER_SUCCESS,
			payload: data
		});

	} catch (error) {
		// Dispatching failure action.
		dispatch({
			type: ADMIN_ALL_ORDER_FAILURE,
			payload: error.response.data.error
		});
	}
}

// Get All Orders  by Admin Action.
export const adminDeleteOrder = (id) => async (dispatch) => {
	try {

		dispatch({ type: ADMIN_ORDER_DELETE_REQUEST });

		// Get all orders data.
		const { data } = await axios.delete("/api/v1/admin/order/" + id);

		// Dispatching success action.
		dispatch({
			type: ADMIN_ORDER_DELETE_SUCCESS,
			payload: data
		});

	} catch (error) {
		// Dispatching failure action.
		dispatch({
			type: ADMIN_ORDER_DELETE_FAILURE,
			payload: error.response.data.error
		});
	}
}

// Admin update Order Action
export const adminUpdateOrder = (orderStatus, id) => async (dispatch) => {
	try {

		dispatch({ type: ADMIN_ORDER_UPDATE_REQUEST });

		const config = {headers: {'Content-Type': 'application/json'}};

		// Get all orders data.
		const { data } = await axios.put("/api/v1/admin/order/" + id, { orderStatus }, config);

		// Dispatching success action.
		dispatch({
			type: ADMIN_ORDER_UPDATE_SUCCESS,
			payload: data
		});
	}
	catch (error)
	{
		dispatch({
			type: ADMIN_ORDER_UPDATE_FAILURE,
			payload: error.response.data.error
		});
	}
}

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};