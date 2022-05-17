/*	
	Date: May 16, 2022
		* Actions For Products.
		* Getting all the products from BackEnd with getProduct() function.

	Date: May 17, 2022
		* Getting specific products from BackEnd with getSpecificProduct() function.
*/

// axios to Communicate with backend.
import axios from 'axios';

// Constants.
import {
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_FAIL,
	PRODUCT_REQUEST,
	PRODUCT_SUCCESS,
	PRODUCT_FAIL,
	CLEAR_ERRORS
} from '../Constants/productConstant';

// Getting all the products from backend and give to store.
export const getProduct = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_PRODUCTS_REQUEST });

		// API of backend.
		const { data } = await axios.get("/api/v1/products");

		dispatch({
			type: ALL_PRODUCTS_SUCCESS,
			payload: data
		})
	}
	catch (error) {
		dispatch({
			type: ALL_PRODUCTS_FAIL,
			payload: error.message
		})
	}
}

// Get SpecificProduct depending on ID provided by Components with match.params.id
export const getSpecificProduct = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_REQUEST });

		const { data } = await axios.get(`/api/v1/product/${id}`);

		dispatch({
			type: PRODUCT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};