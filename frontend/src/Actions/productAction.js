/*	
	Date: May 16, 2022
		* Actions For Products.
		* Getting all the products from BackEnd with getProduct() function.

	Date: May 17, 2022
		* Getting specific products from BackEnd with getSpecificProduct() function.

	Date: May 18, 2022
		* Add Filters to products.
		* Adding product category and price sorting.
*/

// Constants.
import {
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_FAIL,
	PRODUCT_REQUEST,
	PRODUCT_SUCCESS,
	PRODUCT_FAIL,
	CLEAR_ERRORS
} 
from '../Constants/productConstant';

// axios to Communicate with backend.
import axios from 'axios';

// Getting all the products from backend and give to store.
export const getProduct = (searchWords = "", currentPage = 1, price=[0, 10000], category="", sort="") => async (dispatch) => {
	try {
		dispatch({ type: ALL_PRODUCTS_REQUEST });

		// API of backend.

		let link = "/api/v1/products?keyword=" + searchWords
		+ "&page=" + currentPage
		+ "&productPrice[gte]=" + price[0]
		+ "&productPrice[lte]=" + price[1];

		// Creating link which sorts, products in backend and return in data.
		if (category && sort) {

			// If user give product category and sort option.
			link = "/api/v1/products?keyword=" + searchWords
				+ "&page=" + currentPage
				+ "&productPrice[gte]=" + price[0]
				+ "&productPrice[lte]=" + price[1]
				+ "&productCategory=" + category
				+ "&" + sort + "=true";
		}
		// If there is only user category not sorting.
		else if (category && !sort) {
			link = "/api/v1/products?keyword=" + searchWords
			+ "&page=" + currentPage
			+ "&productPrice[gte]=" + price[0]
			+ "&productPrice[lte]=" + price[1]
			+ "&productCategory=" + category;
		}

		// Only sorting products.
		else if (!category && sort) {
			link = "/api/v1/products?keyword=" + searchWords
			+ "&page=" + currentPage
			+ "&productPrice[gte]=" + price[0]
			+ "&productPrice[lte]=" + price[1]
			+ "&" + sort + "=true";
		}
		
		let { data } = await axios.get(link);

		// Dispatch products.
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

		// Get specific product from backend.
		const { data } = await axios.get(`/api/v1/product/${id}`);

		// Dispatch product.
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