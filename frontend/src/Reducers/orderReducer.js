/*
	Date: May 29, 2022
		* Creating order reducer.
		* User order reducer.
*/

// importing all constants.
import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,
	ORDER_REQUEST,
	ORDER_SUCCESS,
	ORDER_FAIL,

	CLEAR_ERRORS
}
from '../Constants/orderConstants';

// Order reducer.
export const createOrderReducer = (state = {} , action) => {
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

export const myOrderReducer = (state = {myOrder: []}, action) => {
	switch(action.type) {
		case ORDER_REQUEST:
			return {
				loadingOrder: true
			};
		case ORDER_SUCCESS:
			return {
				loadingOrder: false,
				myOrder: action.payload
			};
		case ORDER_FAIL:
			return {
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
};