/*
	Date: May 31, 2022
		* Creating Reducer for admin for products.
*/

// Importing necessary constants.
import {
	ADMIN_ALL_PRODUCTS_REQUEST,
	ADMIN_ALL_PRODUCTS_SUCCESS,
	ADMIN_ALL_PRODUCTS_FAILURE,
	ADMIN_NEW_PRODUCT_REQUEST,
	ADMIN_NEW_PRODUCT_SUCCESS,
	ADMIN_NEW_PRODUCT_FAILURE,
	ADMIN_NEW_PRODUCT_RESET,
	CLEAR_ERRORS

} from "../../Constants/Admin/adminProductsConstants";

// Admin to get all products reducer.
export const adminAllProductsReducer = (state = { products: [] }, action) => {

	switch (action.type) {

		case ADMIN_ALL_PRODUCTS_REQUEST:
			return { 
				...state,
				loading: true,
			};

		case ADMIN_ALL_PRODUCTS_SUCCESS:
			return { 
				loading: false, 
				products: action.payload.products,
			};

		case ADMIN_ALL_PRODUCTS_FAILURE:
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

// Admin to Create new Product Reducer.
export const adminCreateNewProductReducer = (state = { status: false }, action) => {

	switch (action.type) {

		case ADMIN_NEW_PRODUCT_REQUEST:
			return { 
				...state,
				loading: true,
			};

		case ADMIN_NEW_PRODUCT_SUCCESS:
			return { 
				loading: false, 
				status: action.payload.status,
			};

		case ADMIN_NEW_PRODUCT_FAILURE:
			return { 
				loading: false, 
				error: action.payload 
			};

		case ADMIN_NEW_PRODUCT_RESET:
			return {
				status: false,
				loading: false,
			}

		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};

		default:
			return state;
	}
}