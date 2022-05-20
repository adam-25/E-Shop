import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Heading from '../Layout/Heading/Heading';
import Loading from '../Loading/Loading';
import './account.css';

const Account = () => {

	const { user, loading, isAuthenticateUser } = useSelector(state => state.user);

	return (
		<Fragment>
			{loading ? <Loading /> : (!isAuthenticateUser ? <Redirect to='/logout' /> :
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
									<a href="/detail/updateName" className='button'>Edit</a>
								</div>
							</div>
							<div className="info">
								<div>
									<h4>Email:</h4>
									<p>{user.userEmail}</p>
								</div>
								<div className="edit">
									<a href="/detail/updateName" className='button'>Edit</a>
								</div>
							</div>
							<div>
								<h4>Password:</h4>
								<strong>**********</strong>
							</div>
							<div>
								<div>
									<a href="/myOrders" className='other-button'>My Orders</a> <br /> <br/> <br/>
								</div>
								<div>
									<a href="/password/update" className="other-button">Change Password</a>
								</div>
						</div>
					</div>
				</div>
				</Fragment>
	)
}
		</Fragment >
	)
}

export default Account