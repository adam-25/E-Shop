/*
	Date: June 2, 2022
		* Created Update User Component for admin.
*/

// Importing necessary modules.
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// Importing necessary components.
import MetaData from '../../Layout/MetaData';
import Loading from '../../Loading/Loading';
import Heading from '../../Layout/Heading/Heading';
import { clearErrors as userClearError } from '../../../Actions/userAction';
import SideBar from '../Layout/SideBar';
import './UpdateUser.css';

const SpecificUserAdmin = () => {

	const history = useHistory();
	const dispatch = useDispatch();

	// Get User
	const { user, loading, error, isAuthenticateUser } = useSelector(state => state.user);

	useEffect(() => {

		if (!window.location.hash) {
			window.location = window.location + '#loaded';
			window.location.reload();
		}

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

	}, [loading, history, isAuthenticateUser, user, dispatch, error]);

	return (
		<Fragment>
			{loading ? <Loading /> : <Fragment>
				{/* Title of the page */}
				<MetaData title="Update User -- ADMIN" />
				{/* Side bar */}
				<SideBar />
				{/* Heading of the page. */}
				<Heading props="Update User..." />

			</Fragment>}
		</Fragment>
	)
}

export default SpecificUserAdmin