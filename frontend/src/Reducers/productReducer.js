/*	
	Date: May 16, 2022
		* Creating Reducer for Store. 
		* productReducer for all products.

	Date: May 17, 2022
		* SpecificProduct Reducer.
		* Add products category, results per page and number of products in page in reducer.
*/

// Importing Constants.
import {
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_FAIL,
	PRODUCT_REQUEST,
	PRODUCT_SUCCESS,
	PRODUCT_FAIL,
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