/*
	Date: May 29, 2022
		* Order Action to create an order.
		* Get User all Orders.
	
	Date: May 30, 2022
		* Add Action which make a get request to backend with ID to get specific order.
*/

// Importing required constants.
import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,
	ORDER_REQUEST,
	ORDER_SUCCESS,
	ORDER_FAIL,
	SPECIFIC_ORDER_REQUEST,
	SPECIFIC_ORDER_SUCCESS,
	SPECIFIC_ORDER_FAIL,
	CLEAR_ERRORS
}
	from "../Constants/orderConstants";

// Importing axios to communicate with backend.
import axios from "axios";

// Create a new order in backend.
export const createOrder = (newOrder) => async (dispatch) => {
	try {
		dispatch({
			type: CREATE_ORDER_REQUEST
		});

		const config = { headers: { "Content-Type": "application/json" } };

		// Sending all order required data to backend in order to create order.
		const { data } = await axios.post("/api/v1/order/newOrder", newOrder, config);

		dispatch({
			type: CREATE_ORDER_SUCCESS,
			payload: data
		});

	}
	catch (error) {
		dispatch({
			type: CREATE_ORDER_FAIL,
			payload: error.response.data.message
		});
	}
};

// Get User order.
export const myOrderAction = () => async (dispatch) => {
	try {
		dispatch({
			type: ORDER_REQUEST
		});
		
		// Getting all order data from backend.
		const { data } = await axios.get("/api/v1/myOrder");

		dispatch({
			type: ORDER_SUCCESS,
			payload: data.myOrder
		});
	}
	catch (error) {
		dispatch({
			type: ORDER_FAIL,
			payload: error.response.data.message
		})
	}
};

// Specific order depending on ID.
export const getSpecificOrder = (orderId) => async (dispatch) => {
	try {
		dispatch({
			type: SPECIFIC_ORDER_REQUEST
		});

		const { data } = await axios.get(`/api/v1/order/${orderId}`);

		dispatch({
			type: SPECIFIC_ORDER_SUCCESS,
			payload: data.specificOrder
		});
	}
	catch (error) {
		dispatch({
			type: SPECIFIC_ORDER_FAIL,
			payload: error.response.data.message
		});
	}
}

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};