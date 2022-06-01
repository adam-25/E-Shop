/*
	Date: May 21, 2022
		* Forgot Password Component that dispatch action when user click on save change button.
*/

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// Importing Components and actions.
import Loading from '../Loading/Loading';
import MetaData from '../Layout/MetaData';
import { clearErrors, forgotPassword } from '../../Actions/forgotPasswordAction';
import './Update.css';

// Forgot Password Component that take email from user and dispatch action of forgot password which send an email to user.
const ForgotPassword = () => {

	const history = useHistory();
	const dispatch = useDispatch();
	const { message, error, loadingProfile } = useSelector((state) => state.forgotPassword);

	// Storing users email.
	const [userEmail, setEmail] = useState("");

	// Dispatch action of forgot password with email so backend can send rest password link to the email.
	const sentEmail = (e) => {
		e.preventDefault();
		dispatch(forgotPassword(userEmail));

		history.push('/login');
	}

	useEffect(() => {
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		// Showing the message.
		if (message) {
			toast(message);
		}


	}, [dispatch, message, error]);
	return (
		<Fragment>
			{loadingProfile ? <Loading /> : <Fragment>
				{/* Page title. */}
				<MetaData title="Enter Email..." />
				<div className="name-change-container">
					<div className="name-info-container">
						<div>
							<h3>Enter Your Email</h3>
						</div>
						<div>
							<p>If you forgot the password associated with your E-Shop account,
								you reset it by providing your Email registered with E-Shop. Be sure to click Submit button when you are done.</p>
							<h5>Your Email</h5>

							{/* Submit button and email input. */}
							<form className="name-change-button" onSubmit={sentEmail}>
								<input type="email" className='new-name-input' onChange={(e) => setEmail(e.target.value)}/>
								<button type='submit'>Save Changes</button>
							</form>
						</div>
					</div>
				</div>
			</Fragment>}
		</Fragment>
	)
}

export default ForgotPassword