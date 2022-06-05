/*
	Date: June 2, 2022
		* Created Update User Component for admin.
*/

// Importing necessary modules.
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// For Submit User role PopUp.
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// For Select Button.
import Select from 'react-select';

// Importing necessary components.
import MetaData from '../../Layout/MetaData';
import Loading from '../../Loading/Loading';
import Heading from '../../Layout/Heading/Heading';
import { clearErrors as userClearError } from '../../../Actions/userAction';
import { adminGetOneUser, adminUpdateUser, clearErrors } from '../../../Actions/Admin/adminUsersAction';
import SideBar from '../Layout/SideBar';
import './UpdateUser.css';

const SpecificUserAdmin = ({ match }) => {

	const history = useHistory();
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	// Get User
	const { user, loading, error, isAuthenticateUser } = useSelector(state => state.user);
	const { user: adminOneUser, loading: loadingOneUser, error: errorOneUser } = useSelector(state => state.adminOneUser);

	const [userRole, setUserRole] = useState('');

	const updateEmailAdmin = () => {
		history.push("/admin/updateUserEmail/" + match.params.id);
	}

	const updateNameAdmin = () => {
		history.push("/admin/updateUserName/" + match.params.id);
	}

	// When submit review button clicked popup opens.
	const handleClickOpen = () => {
		setOpen(true);
	};

	// When popup closed.
	const handleClose = () => {
		setOpen(false);
	};

	const editUserRoleSubmit = () => {
		if (userRole.value === '' || userRole.value === adminOneUser.userRole) {
			toast("Please select an appropriate user role...");
			return;
		}

		const userData = { newRole: userRole.value }

		dispatch(adminUpdateUser(match.params.id, userData));
		handleClose();
		history.push("/admin/users");
	}

	useEffect(() => {

		// If admin is not logged in then redirect to login page.
		if (!loading)
			if (isAuthenticateUser === false)
				history.push('/login');

		// If user is not admin then cannot access all Products.
		if (!loading)
			if (isAuthenticateUser === true)
				if (user.userRole !== 'admin') {
					history.push('/');
					toast("Error: Cannot Access this Resource...")
				}

		if (error) {
			toast("Error: " + error);
			dispatch(userClearError());
		}

		if (errorOneUser) {
			toast("Error: " + errorOneUser);
			dispatch(clearErrors());
		}

		dispatch(adminGetOneUser(match.params.id));

	}, [loading, history, isAuthenticateUser, user, dispatch, error, errorOneUser, match.params.id]);

	return (
		<Fragment>
			{loading || loadingOneUser ? <Loading /> : adminOneUser && <Fragment>
				{/* Title of the page */}
				<MetaData title="Update User -- ADMIN" />
				{/* Side bar */}
				<SideBar />
				{/* Heading of the page. */}
				<Heading props="Update User..." />

				{/* Contain information and reviews seperate */}
				<div className='update-user-container'>
					{/* Full Name */}
					<div>
						{/* Information */}
						<div className='user-information-admin-container'>
							<div>
								<h4>Full Name: </h4>
							</div>
							<div>
								<p>{adminOneUser.userFullName}</p>
							</div>
						</div>
						{/* Edit */}
						<div>
							<button className='edit-user-role-button' onClick={updateNameAdmin}>Edit</button>
						</div>
					</div>
					{/* Email */}
					<div>
						{/* Information */}
						<div className='user-information-admin-container'>
							<div>
								<h4>Email: </h4>
							</div>
							<div>
								<p>{adminOneUser.userEmail}</p>
							</div>
						</div>
						{/* Button */}
						<div>
							<button className='edit-user-role-button' onClick={updateEmailAdmin}>Edit</button>
						</div>
					</div>
					{/* Role */}
					<div>
						{/* Information */}
						<div className='user-information-admin-container'>
							<div>
								<h4>Role: </h4>
							</div>
							<div>
								<p className={adminOneUser.userRole === "admin" ? "green-color" : "red-color"}>{adminOneUser.userRole}</p>
							</div>
						</div>
						{/* Button */}
						<div>
							<button className='edit-user-role-button' onClick={handleClickOpen}>Edit</button>
						</div>
					</div>
				</div>
				{/* Dialog to change the role. */}
				<div>
					{/* When Dialog box opens. */}
					<Dialog
						fullScreen={fullScreen}
						open={open}
						onClose={handleClose}
						aria-labelledby="responsive-dialog-title"
					>
						{/* Title of the popup */}
						<DialogTitle id="responsive-dialog-title" style={{ fontFamily: "Comic Neue, cursive", fontSize: "3vmax" }} >
							Are you Sure?
						</DialogTitle>
						<DialogContent>

							{/* Select button with div */}
							<div className=''>
								<Select
									options={[{ value: "user", label: "User" }, { value: "admin", label: "Admin" }]}
									defaultValue={userRole}
									onChange={setUserRole}
								/>
								<div>
									{/* Submit Button. */}
									<button id="review-popup-button" onClick={editUserRoleSubmit}>
										Update
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

			</Fragment>}
		</Fragment>
	)
}

export default SpecificUserAdmin