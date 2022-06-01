/*	
	Date: May 20, 2022
		* Creating Account Component.
*/

// Importing necessary modules.
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// Importing necessary components.
import MetaData from '../Layout/MetaData';
import Heading from '../Layout/Heading/Heading';
import Loading from '../Loading/Loading';
import { clearErrors } from '../../Actions/userAction';
import './account.css';

// Account Component.
const Account = () => {

	const history = useHistory();
	const dispatch = useDispatch();

	// Get Login User Information.
	const { user, loading, isAuthenticateUser, error } = useSelector(state => state.user);

	useEffect(() => {

		// If User is not logged in then redirect to the login page.
		if (isAuthenticateUser === false) {
			history.push("/login");
		}

		if (error) {
			toast.error("Error: " + error);
			dispatch(clearErrors());
		}

	}, [isAuthenticateUser, history, error, dispatch]);

	return (
		<Fragment>
			{loading ? <Loading /> : ( isAuthenticateUser &&
				<Fragment>
					{/* Give Page name with User first name's Account */}
					{user && <MetaData title={user.userFirstName + "'s Account..."} />}
					{/* Heading of page. */}
					<Heading props="Your Information" />
					<div className="user-information">
						<div className="user-information-container">
							<div className="info">
								<div>
									{/* User Full name. */}
									<h4>Full Name:</h4>
									<p>{user.userFullName}</p>
								</div>
								{/* Edit name button. */}
								<div className="edit">
									<a href="/updateName" className='info-edit-button'>Edit</a>
								</div>
							</div>
							<div className="info">
								<div>
									{/* User email. */}
									<h4>Email:</h4>
									<p>{user.userEmail}</p>
								</div>
								{/* Edit email button. */}
								<div className="edit">
									<a href="/updateEmail" className='info-edit-button'>Edit</a>
								</div>
							</div>
							<div>
								{/* Password. */}
								<h4>Password:</h4>
								<strong>**********</strong>
							</div>
							<div>
								{/* User orders and changing password buttons. */}
								<div>
									<a href="/myOrders" className='other-button'>My Orders</a> <br /> <br /> <br />
								</div>
								<div>
									<a href="/password/update" className="other-button">Change Password</a>
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment >
	)
}

export default Account