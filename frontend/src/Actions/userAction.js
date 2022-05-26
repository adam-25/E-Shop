/*	
	Date: May 19, 2022
		* Login/Register User action.
		* Add Loading User.

	Date: May 20, 2022
		* Logout user action.
*/

// Importing all Constants required.
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
	CLEAR_ERRORS 
} from "../Constants/userConstant";

// axios to get data from backend.
import axios from "axios";

// Login user based on email and password.
export const loginUser = (userEmail, userPassword) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST })
		const config = { headers: { "Content-Type": "application/json" } };

		// Login user with email and password.
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

// Register User with name, email and password.
export const registerUser = (userName, userEmail, userPassword) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_REQUEST })

		const config = { headers: { "Content-Type": "application/json" } };

		// Register user with name, email and password.
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

// Logout User when he/she click on logout button and when logoutUser function dispatch.
export const logoutUser = () => async (dispatch) => {
	try {

		// Make get request to backend to logout user.
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

// Loading User information.
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOADING_REQUEST })

		// Get all User details.
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