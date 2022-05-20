import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Heading from '../Layout/Heading/Heading';
import Loading from '../Loading/Loading';
import './account.css';

const Account = () => {

	let history = useHistory();

	const { user, loading, isAuthenticateUser } = useSelector(state => state.user);

	useEffect(() => {

		if (isAuthenticateUser === false) {
			history.push("/login");
		}
	}, [isAuthenticateUser, history]);

	return (
		<Fragment>
			{loading ? <Loading /> : ( isAuthenticateUser &&
				<Fragment>
					{user && <MetaData title={user.userFirstName + "'s Account..."} />}
					<Heading props="Your Information" />
					<div className="user-information">
						<div className="user-information-container">
							<div className="info">
								<div>
									<h4>Full Name:</h4>
									<p>{user.userFullName}</p>
								</div>
								<div className="edit">
									<a href="/updateName" className='info-edit-button'>Edit</a>
								</div>
							</div>
							<div className="info">
								<div>
									<h4>Email:</h4>
									<p>{user.userEmail}</p>
								</div>
								<div className="edit">
									<a href="/updateEmail" className='info-edit-button'>Edit</a>
								</div>
							</div>
							<div>
								<h4>Password:</h4>
								<strong>**********</strong>
							</div>
							<div>
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