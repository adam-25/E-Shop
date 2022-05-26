/*	
	Date: May 20, 2022
		* Update User Email.
*/

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Importing Components.
import Loading from '../Loading/Loading';
import MetaData from '../Layout/MetaData';
import './Update.css';

// Import toast and useHistory.
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// Importing required constants to dispatch and actions.
import { UPDATE_EMAIL_RESET } from '../../Constants/profileConstants';
import { clearErrors, updateEmail } from '../../Actions/profileActions';
import { loadUser } from '../../Actions/userAction';

// Update Email component.
const UpdateEmail = () => {

	const dispatch = useDispatch();
	const history = useHistory();


	// Get User details of login and isProperty updated or not.
	const { loading, isAuthenticateUser } = useSelector(state => state.user);
	const { isUpdate, error } = useSelector((state) => state.profile);

	const [newEmail, setEmail] = useState("");


	// function called when user input new updated email.
	const changeEmailSubmit = (e) => {
		e.preventDefault();
		dispatch(updateEmail(newEmail));
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
			toast("Email Updated Successfully");
			dispatch(loadUser());
			history.push("/account");

			dispatch({ type: UPDATE_EMAIL_RESET });
		}


	}, [loading, history, isAuthenticateUser, isUpdate, dispatch, error]);
	return (
		<Fragment>
			{loading ? <Loading /> : <Fragment>
				{/* Page Title */}
				<MetaData title="Edit email" />
				<div className="name-change-container">
					<div className="name-info-container">
						<div>
							<h3>Change Your Email</h3>
						</div>
						<div>
							<p>If you want to change the email associated with your E-Shop account,
								you may do so below. Be sure to click the Save Changes button when you are done.</p>
							<h5>New Email</h5>

							{/* Form when submit email will be updated. */}
							<form className="name-change-button" onSubmit={changeEmailSubmit}>
								<input type="email" className='new-name-input' onChange={(e) => setEmail(e.target.value)} />
								<button type='submit'>Save Changes</button>
							</form>
						</div>
					</div>
				</div>
			</Fragment>}
		</Fragment>
	)
}

export default UpdateEmail