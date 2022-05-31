/*
	Date: May 31, 2022
		* Creating Reducer for admin for orders.
*/

// Importing necessary constants.
import {
	ADMIN_ALL_ORDER_REQUEST,
	ADMIN_ALL_ORDER_SUCCESS,
	ADMIN_ALL_ORDER_FAILURE,

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