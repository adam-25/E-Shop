/*
	Date: May 31, 2022
		* Created Action for admin to get All Products.
*/

// Importing necessary constants.
import {
	ADMIN_ALL_PRODUCTS_REQUEST,
	ADMIN_ALL_PRODUCTS_SUCCESS,
	ADMIN_ALL_PRODUCTS_FAILURE,
	CLEAR_ERRORS
} from "../../Constants/Admin/adminProductsConstants";

// Importing axios for making API calls.
import axios from "axios";

// Get All Products by Admin Action.
export const adminAllProducts = () => async (dispatch) => {
	try {

				// Request to get all Products.
		dispatch({ type: ADMIN_ALL_PRODUCTS_REQUEST });
		
		// Get all products data.
		const { data } = await axios.get("/api/v1/admin/products/getAll");

		// Dispatching success action.
		dispatch({
			type: ADMIN_ALL_PRODUCTS_SUCCESS,
			payload: data
		});
	} catch (error) {
		// Dispatching failure action.
		dispatch({
			type: ADMIN_ALL_PRODUCTS_FAILURE,
			payload: error.response.data.error
		});
	}
}

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};