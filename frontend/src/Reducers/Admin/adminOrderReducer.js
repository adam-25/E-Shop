/*
	Date: May 31, 2022
		* Creating Reducer for admin for orders.

	Date: June 1, 2022
		* Creating a Component for Admin to update Orders.
		* Creating a Component for Admin to delete Orders.
*/

// Importing necessary constants.
import {
	ADMIN_ALL_ORDER_REQUEST,
	ADMIN_ALL_ORDER_SUCCESS,
	ADMIN_ALL_ORDER_FAILURE,
	ADMIN_ORDER_UPDATE_REQUEST,
	ADMIN_ORDER_UPDATE_SUCCESS,
	ADMIN_ORDER_UPDATE_FAILURE,
	ADMIN_ORDER_UPDATE_RESET,
	ADMIN_ORDER_DELETE_REQUEST,
	ADMIN_ORDER_DELETE_SUCCESS,
	ADMIN_ORDER_DELETE_FAILURE,
	ADMIN_ORDER_DELETE_RESET,
	CLEAR_ERRORS
} from "../../Constants/Admin/adminOrderConstants";

// Admin to get all orders reducer.
export const adminAllOrderReducer = (state = { orders: [], totalEarnings: 0 }, action) => {

	switch (action.type) {

		case ADMIN_ALL_ORDER_REQUEST:
			return {
				...state,
				loading: true,
			};

		case ADMIN_ALL_ORDER_SUCCESS:
			return {
				loading: false,
				orders: action.payload.orders,
				totalEarnings: action.payload.totalEarnings,
			};

		case ADMIN_ALL_ORDER_FAILURE:
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

// Admin to get all orders reducer.
export const adminUpdateDeleteOrderReducer = (state = { status: false }, action) => {

	switch (action.type) {
		case ADMIN_ORDER_DELETE_REQUEST:
		case ADMIN_ORDER_UPDATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ADMIN_ORDER_DELETE_SUCCESS:
		case ADMIN_ORDER_UPDATE_SUCCESS:
			return {
				loading: false,
				status: action.payload.status
			};
		case ADMIN_ORDER_DELETE_FAILURE:
		case ADMIN_ORDER_UPDATE_FAILURE:
			return {
				loading: false,
				error: action.payload
			};
		case ADMIN_ORDER_DELETE_RESET:
		case ADMIN_ORDER_UPDATE_RESET:
			return {
				loading: false,
				status: false
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