import { 
	LOGIN_REQUEST, 
	LOGIN_SUCCESS, 
	LOGIN_FAIL, 
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
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

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};