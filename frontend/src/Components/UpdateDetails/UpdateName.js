/*
	Date: May 20, 2022
		* Create User name.
	
	Date: May 21, 2022
		* Update in account also when redirect and make isUpdate false again.
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
import { UPDATE_NAME_RESET } from '../../Constants/profileConstants';
import { clearErrors, updateName } from '../../Actions/profileActions';
import { loadUser } from '../../Actions/userAction';

// Update Name component.
const UpdateName = () => {

	const dispatch = useDispatch();
	const history = useHistory();

	// Get User details of login and isProperty updated or not.
	const { loading, isAuthenticateUser } = useSelector(state => state.user);
	const { isUpdate, error } = useSelector((state) => state.profile);

	const [newFullName, setNewFullName] = useState("");

	// function called when user input new updated name.
	const changeNameSubmit = (e) => {
		e.preventDefault();
		dispatch(updateName(newFullName));
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
			toast("Name Updated Successfully");
			dispatch(loadUser());
			history.push("/account");

			dispatch({ type: UPDATE_NAME_RESET });
		}


	}, [loading, history, isAuthenticateUser, isUpdate, dispatch, error]);
	return (
		<Fragment>
			{loading ? <Loading /> : <Fragment>
				{/* Page Title */}
				<MetaData title="Edit name" />
				<div className="name-change-container">
					<div className="name-info-container">
						<div>
							<h3>Change Your Name</h3>
						</div>
						<div>
							<p>If you want to change the name associated with your E-Shop account,
								you may do so below. Be sure to click the Save Changes button when you are done.</p>
							<h5>New Name</h5>

							{/* Form when submit name will be updated. */}
							<form className="name-change-button" onSubmit={changeNameSubmit}>
								<input type="text" className='new-name-input' required onChange={(e) => setNewFullName(e.target.value)} />
								<button type='submit'>Save Changes</button>
							</form>
						</div>
					</div>
				</div>
			</Fragment>}
		</Fragment>
	)
}

export default UpdateName;