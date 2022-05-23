import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Update.css';
import { useHistory } from 'react-router-dom';


// Importing Components.
import Loading from '../Loading/Loading';
import MetaData from '../Layout/MetaData';
import { clearErrors, resetPassword } from '../../Actions/forgotPasswordAction';
import { toast } from 'react-toastify';

const ResetPassword = ( {match} ) => {

	let history = useHistory();
	const dispatch = useDispatch();

	const { success, error, loadingProfile } = useSelector((state) => state.forgotPassword);

	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmPassword] = useState("");

	const resetToken = match.params.resetToken;
	
	const passwordReset = (e) => {
		e.preventDefault();
		dispatch(resetPassword(resetToken, newPassword, confirmNewPassword));
	}

	useEffect(() => {
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		if (success) {
			toast("Password Successfully Updated");

			history.push("/login");
		}


	}, [dispatch, success, error, loadingProfile, history]); 
	return (
		<Fragment>
			{loadingProfile ? <Loading /> : <Fragment>
				<MetaData title="Reset Password" />
				<div className="name-change-container">
					<div className="name-info-container">
						<div>
							<h3>Reset Your Password</h3>
						</div>
						<div>
							<p>If you want to change the Password associated with your E-Shop account,
								you may do so below. Be sure to click the Save Changes button when you are done.</p>

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