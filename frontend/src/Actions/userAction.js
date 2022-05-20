import { 
	LOGIN_REQUEST, 
	LOGIN_SUCCESS, 
	LOGIN_FAIL, 
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOADING_REQUEST,
	LOADING_SUCCESS,
	LOADING_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	CLEAR_ERRORS } from "../Constants/userConstant";
import axios from "axios";

export const loginUser = (userEmail, userPassword) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST })

		const config = { header: { "Content-Type": "application/json" } };

		const { data } = await axios.post(
			`/api/v1/Login`,
			{ userEmail: userEmail, userPassword: userPassword },
			config
		);

		dispatch({ type: LOGIN_SUCCESS, payload: data });
	}
	catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const registerUser = (userName, userEmail, userPassword) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_REQUEST })

		const config = { header: { "Content-Type": "application/json" } };

		const { data } = await axios.post(
			`/api/v1/Register`,
			{ userFullName: userName, userEmail: userEmail, userPassword: userPassword },
			config
		);

		dispatch({ type: REGISTER_SUCCESS, payload: data });
	}
	catch (error) {
		dispatch({
			type: REGISTER_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const logoutUser = () => async (dispatch) => {
	try {
		const { data } = await axios.get("/api/v1/logout");

		dispatch({ type: LOGOUT_SUCCESS, payload: data });
	}
	catch (error) {
		dispatch({
			type: LOGOUT_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOADING_REQUEST })

		const { data } = await axios.get("/api/v1/details");

		dispatch({ type: LOADING_SUCCESS, payload: data });
	}
	catch (error) {
		dispatch({
			type: LOADING_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};