/*	
	Date: June 1, 2022
		* Created Component where admin can update the user order status.
*/
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import MetaData from '../../Layout/MetaData';
import Loading from '../../Loading/Loading';
import Heading from '../../Layout/Heading/Heading';
import { clearErrors } from '../../../Actions/userAction';
import SideBar from '../Layout/SideBar';

const UpdateOrderAdmin = () => {

	const history = useHistory();
	const dispatch = useDispatch();

	const { user, isAuthenticateUser, error, loading } = useSelector(state => state.user);

	useEffect(() => {
		if (!window.location.hash) {
			window.location = window.location + '#loaded';
			window.location.reload();
		}

		// If admin is not logged in then redirect to login page.
		if (!loading)
			if (isAuthenticateUser === false)
				history.push('/login');

		// If user is not admin then cannot access dashboard.
		if (!loading)
			if (isAuthenticateUser === true)
				if (user.userRole !== 'admin') {
					history.push('/');
					toast("Error: Cannot Access this Resource...")
				}

		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

	}, [history, loading, isAuthenticateUser, dispatch, error, user]);

	return (
		<Fragment>
			{loading ? <Loading /> : <Fragment>
				<MetaData title="Update Order -- ADMIN" />
				<SideBar />
				<Heading props="Update Order..." />

			</Fragment>}

		</Fragment>
	)
}

export default UpdateOrderAdmin