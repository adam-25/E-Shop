import {
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_FAIL,
	PRODUCT_REQUEST,
	PRODUCT_SUCCESS,
	PRODUCT_FAIL,
	CLEAR_ERRORS
} from '../Constants/productConstant';

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
				productsCount: action.payload.totalProducts
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

export const specificProductReducer = (state = { oneProduct: {} }, action) => {
	switch (action.type) {
		case PRODUCT_REQUEST:
			return {
				loading: true,
				...state,
			};
		case PRODUCT_SUCCESS:
			return {
				loading: false,
				oneProduct: action.payload.oneProduct,
			};
		case PRODUCT_FAIL:
			return {
				loading: false,
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