import axios from "axios";
import {
	UPDATE_NAME_REQUEST,
	UPDATE_NAME_SUCCESS,
	UPDATE_NAME_FAIL,

	UPDATE_EMAIL_REQUEST,
	UPDATE_EMAIL_SUCCESS,
	UPDATE_EMAIL_FAIL,

	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAIL,

	CLEAR_ERRORS

} from "../Constants/profileConstants";

export const updateName = (newFullName) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_NAME_REQUEST });

		const config = { headers: { "Content-Type": "application/json" } };

		const { data } = await axios.put("/api/v1/details/updateName", { newFullName: newFullName }, config);

		dispatch({ type: UPDATE_NAME_SUCCESS, payload: data });
	}
	catch (error) {
		dispatch({
			type: UPDATE_NAME_FAIL,
			payload: error.response.data.message
		})
	}
}

export const updateEmail = (newEmail) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_EMAIL_REQUEST });

		const config = { headers: { "Content-Type": "application/json" } };

		const { data } = await axios.put("/api/v1/details/updateEmail", { newEmail: newEmail }, config);

		dispatch({ type: UPDATE_EMAIL_SUCCESS, payload: data });
	}
	catch (error) {
		dispatch({
			type: UPDATE_EMAIL_FAIL,
			payload: error.response.data.message
		})
	}
}

export const updatePassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {

	try {
		dispatch({ type: UPDATE_PASSWORD_REQUEST });

		const config = { headers: { "Content-Type": "application/json" } };

		const { data } = await axios.put("/api/v1/password/update", { oldPassword: oldPassword, 
			newPassword: newPassword, 
			confirmPassword: confirmPassword }, config);

		dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
	}
	catch (error) {
		dispatch({
			type: UPDATE_PASSWORD_FAIL,
			payload: error.response.data.message
		})
	}

}

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};