/*
	Date: May 31, 2022
		* Created Action for admin to get All Orders.
*/

// Importing necessary constants.
import {
	ADMIN_ALL_ORDER_REQUEST,
	ADMIN_ALL_ORDER_SUCCESS,
	ADMIN_ALL_ORDER_FAILURE
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

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};