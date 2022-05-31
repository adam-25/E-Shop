/*	
	Date: May 16, 2022
		* Creating Reducer for Store. 
		* productReducer for all products.

	Date: May 17, 2022
		* SpecificProduct Reducer.
		* Add products category, results per page and number of products in page in reducer.

	Date: May 30, 2022
		* Add Product Review Reducer.
*/

// Importing Constants.
import {
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_FAIL,
	PRODUCT_REQUEST,
	PRODUCT_SUCCESS,
	PRODUCT_FAIL,
	REVIEW_REQUEST,
	REVIEW_SUCCESS,
	REVIEW_FAIL,
	CLEAR_ERRORS
} from '../Constants/productConstant';

// All products Reducer.
export const productReducer = (state = { products: [] }, action) => {

	switch (action.type) {
		case ALL_PRODUCTS_REQUEST:
			return {
				loading: true,
				products: []
			}
		case ALL_PRODUCTS_SUCCESS:
			return {
				loading: false,
				products: action.payload.products,
				productsCount: action.payload.totalProducts,
				resultsPerPage: action.payload.resultsPerPage,
				totalSearchProducts: action.payload.totalSearchProducts,
				categories: action.payload.categories
			}
		case ALL_PRODUCTS_FAIL:
			return {
				loading: false,
				error: action.payload
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			}
		default:
			return state;
	}
};

// SpecificProduct Reducer.
export const specificProductReducer = (state = { oneProduct: {} }, action) => {
	switch (action.type) {
		case PRODUCT_REQUEST:
			return {
				loadingOneProduct: true,
				...state,
			};
		case PRODUCT_SUCCESS:
			return {
				loadingOneProduct: false,
				oneProduct: action.payload.oneProduct,
			};
		case PRODUCT_FAIL:
			return {
				loadingOneProduct: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Adding or updating product review reducer.
export const AddOrUpdateReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case REVIEW_REQUEST:
			return {
				loading: true,
				...state,
			};
		case REVIEW_SUCCESS:
			return {
				loading: false,
				message: action.payload,
			};
		case REVIEW_FAIL:
			return {
				loading: false,
				reviewError: action.payload,
				...state,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				reviewError: null,
			};
		default:
			return state;
	}
}