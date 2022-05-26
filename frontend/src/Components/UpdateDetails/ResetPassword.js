/*
	Date: May 21, 2022
		* Forgot Password Component that dispatch action when user click on save change button.
*/

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// Importing Components.
import Loading from '../Loading/Loading';
import MetaData from '../Layout/MetaData';
import { clearErrors, resetPassword } from '../../Actions/forgotPasswordAction';
import './Update.css';

// Reset Password Component that take the resetToken as input and dispatch to reset Password action.
const ResetPassword = ( {match} ) => {

	let history = useHistory();
	const dispatch = useDispatch();

	const { success, error, loadingProfile } = useSelector((state) => state.forgotPassword);

	// Taking new and confirm password input from user.
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmPassword] = useState("");

	// Reset Password token from the link.
	const resetToken = match.params.resetToken;
	
	// Dispatch reset password action.
	const passwordReset = (e) => {
		e.preventDefault();
		dispatch(resetPassword(resetToken, newPassword, confirmNewPassword));
	}

	useEffect(() => {
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		// Checking if password has changed or not.
		if (success) {
			toast("Password Successfully Updated");

			history.push("/login");
		}


	}, [dispatch, success, error, loadingProfile, history]); 
	return (
		<Fragment>
			{loadingProfile ? <Loading /> : <Fragment>
				{/* Page title. */}
				<MetaData title="Reset Password" />
				<div className="name-change-container">
					<div className="name-info-container">
						<div>
							<h3>Reset Your Password</h3>
						</div>
						<div>
							<p>If you want to change the Password associated with your E-Shop account,
								you may do so below. Be sure to click the Save Changes button when you are done.</p>

							{/* Input of new password and confirm password and submit button. */}
							<form className="name-change-button" onSubmit={passwordReset}>
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

export default ResetPassword;