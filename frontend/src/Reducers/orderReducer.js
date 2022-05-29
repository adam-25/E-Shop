/*
	Date: May 29, 2022
		* Creating order reducer.
*/

// importing all constants.
import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,

	CLEAR_ERRORS
}
from '../Constants/orderConstants';

// Order reducer.
export const orderReducer = (state = {} , action) => {
	switch(action.type) {
		case CREATE_ORDER_REQUEST:
			return {
				...state,
				loadingOrder: true,
			};
		case CREATE_ORDER_SUCCESS:
			return {
				loadingOrder: false,
				order: action.payload
			};
		case CREATE_ORDER_FAIL:
			return {
				...state,
				loadingOrder: false,
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