/*
	Date: May 31, 2022
		* Created Action for admin to get All Products.
		* Add Creating a new Product.
*/

// Importing necessary constants.
import {
	ADMIN_ALL_PRODUCTS_REQUEST,
	ADMIN_ALL_PRODUCTS_SUCCESS,
	ADMIN_ALL_PRODUCTS_FAILURE,
	ADMIN_NEW_PRODUCT_REQUEST,
	ADMIN_NEW_PRODUCT_SUCCESS,
	ADMIN_NEW_PRODUCT_FAILURE,
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

// Create a new Product Action.
export const adminCreateNewProduct = (productData) => async (dispatch) => {
	try {

		// Request to create new product.
		dispatch({ type: ADMIN_NEW_PRODUCT_REQUEST });

		const config = {headers: {'Content-Type': 'application/json'}};

		// Create new product data.
		const { data } = await axios.post("/api/v1/products/newProduct", productData, config);

		// Dispatching success action.
		dispatch({
			type: ADMIN_NEW_PRODUCT_SUCCESS,
			payload: data
		});

	} catch (error) {
		// Dispatching failure action.
		dispatch({
			type: ADMIN_NEW_PRODUCT_FAILURE,
			payload: error.response.data.error
		});
	}
}

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};