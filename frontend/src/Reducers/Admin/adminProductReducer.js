/*
	Date: May 31, 2022
		* Creating Reducer for admin for products.
		* Created Reducer for admin to create new Products.

	Date: June 1, 2022
		* Created Reducer for admin to delete Products.
		* Created Reducer for admin to update Products.

	Date: June 2, 2022
		* Created Reducer for admin to get all reviews of product.
		* Created Reducer for admin to delete review of product.
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
	ADMIN_DELETE_PRODUCT_REQUEST,
	ADMIN_DELETE_PRODUCT_SUCCESS,
	ADMIN_DELETE_PRODUCT_FAILURE,
	ADMIN_DELETE_PRODUCT_RESET,
	ADMIN_UPDATE_PRODUCT_REQUEST,
	ADMIN_UPDATE_PRODUCT_SUCCESS,
	ADMIN_UPDATE_PRODUCT_FAILURE,
	ADMIN_UPDATE_PRODUCT_RESET,
	ADMIN_ALL_REVIEWS_REQUEST,
	ADMIN_ALL_REVIEWS_SUCCESS,
	ADMIN_ALL_REVIEWS_FAILURE,
	ADMIN_DELETE_REVIEW_REQUEST,
	ADMIN_DELETE_REVIEW_SUCCESS,
	ADMIN_DELETE_REVIEW_FAILURE,
	ADMIN_DELETE_REVIEW_RESET,
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
		case ADMIN_DELETE_PRODUCT_REQUEST:
		case ADMIN_NEW_PRODUCT_REQUEST:
			return { 
				...state,
				loading: true,
			};

		case ADMIN_DELETE_PRODUCT_SUCCESS:
		case ADMIN_NEW_PRODUCT_SUCCESS:
			return { 
				loading: false, 
				status: action.payload.status,
			};

		case ADMIN_DELETE_PRODUCT_FAILURE:
		case ADMIN_NEW_PRODUCT_FAILURE:
			return { 
				loading: false, 
				error: action.payload 
			};
		
		case ADMIN_DELETE_PRODUCT_RESET:
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

// Admin to update product reducer.
export const adminUpdateProductReducer = (state = { status: false }, action) => {
	switch (action.type) {
		case ADMIN_UPDATE_PRODUCT_REQUEST:
			return { 
				...state,
				loading: true,
			};

		case ADMIN_UPDATE_PRODUCT_SUCCESS:
			return { 
				loading: false, 
				status: action.payload.status,
			};

		case ADMIN_UPDATE_PRODUCT_FAILURE:
			return { 
				loading: false, 
				error: action.payload 
			};

		case ADMIN_UPDATE_PRODUCT_RESET:
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

// Admin to get all reviews of product reducer.
export const adminAllReviewsReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case ADMIN_ALL_REVIEWS_REQUEST:
			return { 
				...state,
				loading: true,
			};

		case ADMIN_ALL_REVIEWS_SUCCESS:
			return { 
				loading: false, 
				reviews: action.payload.reviews,
			};

		case ADMIN_ALL_REVIEWS_FAILURE:
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

// Admin to delete review of product reducer.
export const adminDeleteReviewReducer = (state = { status: false }, action) => {
	switch (action.type) {
		case ADMIN_DELETE_REVIEW_REQUEST:
			return { 
				...state,
				loading: true,
			};

		case ADMIN_DELETE_REVIEW_SUCCESS:
			return { 
				loading: false, 
				status: action.payload.status,
			};

		case ADMIN_DELETE_REVIEW_FAILURE:
			return { 
				loading: false, 
				error: action.payload 
			};

		case ADMIN_DELETE_REVIEW_RESET:
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