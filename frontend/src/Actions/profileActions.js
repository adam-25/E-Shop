import axios from "axios";
import {
	UPDATE_NAME_REQUEST,
UPDATE_NAME_SUCCESS,
UPDATE_NAME_FAIL,
UPDATE_NAME_RESET ,

UPDATE_EMAIL_REQUEST,
UPDATE_EMAIL_SUCCESS,
UPDATE_EMAIL_FAIL,
UPDATE_EMAIL_RESET,

CLEAR_ERRORS

} from "../Constants/profileConstants";

export const updateName = ({name}) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_NAME_REQUEST });

		const { data } = axios.put("/details/updateName", name);

		dispatch({ type: UPDATE_NAME_SUCCESS, payload: data });
	}
	catch (error) {
		dispatch({ 
			type: UPDATE_NAME_FAIL, 
			payload: error.response.data.message
		})
	}
}

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};