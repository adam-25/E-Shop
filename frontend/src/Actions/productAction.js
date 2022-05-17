import axios from 'axios';
import {
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_FAIL,
	PRODUCT_REQUEST,
	PRODUCT_SUCCESS,
	PRODUCT_FAIL,
	CLEAR_ERRORS
} from '../Constants/productConstant';

export const getProduct = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_PRODUCTS_REQUEST });

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

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};