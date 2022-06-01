/*
	Date: May 21, 2022
		* Create UpdatePassword while User Logged in.
*/


import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// Importing Components.
import Loading from '../Loading/Loading';
import MetaData from '../Layout/MetaData';
import './Update.css';

// Import toast and useHistory.
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

// Importing required constants to dispatch and actions.
import { clearErrors, updatePassword } from '../../Actions/profileActions';
import { loadUser } from '../../Actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../Constants/profileConstants';

// Update Password while log in component.
const UpdatePassword = () => {

	const dispatch = useDispatch();
	const history = useHistory();

	// Get User details of login and isProperty updated or not.
	const { loading, isAuthenticateUser } = useSelector(state => state.user);
	const { isUpdate, error, loadingProfile } = useSelector((state) => state.profile);

	// Set old password, new password and confirm password while user enter their password.
	const [newPassword, setNewPassword] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// When user submit newPassword request this function will be called.
	const changePasswordSubmit = (e) => {
		e.preventDefault();
		dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
	}

	useEffect(() => {
		// if user is logged out then redirect to logout page.
		if (!loading) {
			if (isAuthenticateUser === false) {
				history.push("/logout");
			}
		}

		// If an error occurs then show the error message.
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

				// If update is successful, then show it and redirect to /account.
		if (isUpdate) {
			toast("Password Updated Successfully");
			dispatch(loadUser());
			history.push("/account");

			dispatch({ type: UPDATE_PASSWORD_RESET });
		}


	}, [loading, history, isAuthenticateUser, isUpdate, dispatch, error]);
	return (
		<Fragment>
			{loadingProfile ? <Loading /> : <Fragment>
				{/* Page Title. */}
				<MetaData title="Edit Password" />
				<div className="name-change-container">
					<div className="name-info-container">
						<div>
							<h3>Change Your Password</h3>
						</div>
						<div>
							<p>If you want to change the Password associated with your E-Shop account,
								you may do so below. Be sure to click the Save Changes button when you are done.</p>

							{/* Form when submit password will be updated. */}
							<form className="name-change-button" onSubmit={changePasswordSubmit}>
								<h5>Old Password</h5>
								<input type="password" className='new-name-input' required onChange={(e) => setOldPassword(e.target.value)} />
								<h5>New Password</h5>
								<input type="password" className='new-name-input' required onChange={(e) => setNewPassword(e.target.value)} />
								<h5>Confirm Password</h5>
								<input type="password" className='new-name-input' required onChange={(e) => setConfirmPassword(e.target.value)} />
								<button type='submit'>Save Changes</button>
							</form>
						</div>
					</div>
				</div>
			</Fragment>}
		</Fragment>
	)
}

export default UpdatePassword;