/*
	Date: May 31, 2022
		* Creating Reducer for admin for products.
*/

// Importing necessary constants.
import {
	ADMIN_ALL_PRODUCTS_REQUEST,
	ADMIN_ALL_PRODUCTS_SUCCESS,
	ADMIN_ALL_PRODUCTS_FAILURE,

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