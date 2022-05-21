import axios from "axios";
import {
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	CLEAR_ERRORS
} from "../Constants/forgotPasswordConstant";

export const forgotPassword = (userEmail) => async (dispatch) => {

	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });

		const config = { headers: { "Content-Type": "application/json" } };

		const { data } = await axios.post("/api/v1/password/forgot", { userEmail: userEmail }, config);

		dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
	}
	catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload: error.response.data.message
		})
	}
}

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};