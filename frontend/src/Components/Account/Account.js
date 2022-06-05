/*	
	Date: May 20, 2022
		* Creating Account Component.

	Date: June 2,2022
		* User can delete their accounts.
*/

// Importing necessary modules.
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// For Submit Review PopUp.
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Importing necessary components.
import MetaData from '../Layout/MetaData';
import Heading from '../Layout/Heading/Heading';
import Loading from '../Loading/Loading';
import { clearErrors, deleteUser } from '../../Actions/userAction';
import './account.css';
import { DELETE_USER_RESET } from '../../Constants/userConstant';

// Account Component.
const Account = () => {

	const history = useHistory();
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const handleClickOpen = () => {
		setOpen(true);
	};

	// When popup closed.
	const handleClose = () => {
		setOpen(false);
	};

	// Get Login User Information.
	const { user, loading, isAuthenticateUser, error } = useSelector(state => state.user);
	const { loading: loadingUserDelete, error: errorUserDelete, status } = useSelector(state => state.userAccountDelete);

	const deleteUserAccount = async () => {
		dispatch(deleteUser());
		history.push('/login');
	}

	useEffect(() => {

		// If User is not logged in then redirect to the login page.
		if (!loading) {
			if (isAuthenticateUser === false) {
				history.push("/login");
			}
		}

		if (error) {
			toast.error("Error: " + error);
			dispatch(clearErrors());
		}

		if (errorUserDelete) {
			toast.error("Error: " + errorUserDelete);
			dispatch(clearErrors());
		}

		if (status === true) {
			dispatch(clearErrors());
			dispatch({ type: DELETE_USER_RESET })
			history.push("/");
		}

	}, [isAuthenticateUser, history, error, dispatch, errorUserDelete, status, loading]);

	return (
		<Fragment>
			{loading || loadingUserDelete ? <Loading /> : (isAuthenticateUser &&
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
								<div>
									<button className="other-button delete-account-button" onClick={handleClickOpen}>Delete Account</button>
								</div>
							</div>
						</div>
					</div>
					<div className='popup-review'>
						{/* When Dialog box opens when close. */}
						<Dialog
							fullScreen={fullScreen}
							open={open}
							onClose={handleClose}
							aria-labelledby="responsive-dialog-title"
						>
							{/* Title of the popup */}
							<DialogTitle id="responsive-dialog-title" style={{ fontFamily: "Comic Neue, cursive", fontSize: "2.5rem" }} >
								Are you sure?
							</DialogTitle>
							<DialogContent>
								{/* rating to set */}
								<div>
								</div>
								{/* TextArea where comment is written */}
								<div className='paragraph-tag-pop-up'>
									<div>
										<p>You want to delete your Account?</p>
									</div>
									<div>
										{/* Submit Button. */}
										<button id="review-popup-button" onClick={deleteUserAccount}>
											Delete
										</button>
										{/* Cancel Button */}
										<button id="review-popup-button" onClick={handleClose}>
											Cancel
										</button>
									</div>
								</div>
							</DialogContent>
						</Dialog>
					</div>
				</Fragment>
			)}
		</Fragment >
	)
}

export default Account