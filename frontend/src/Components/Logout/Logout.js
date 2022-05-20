import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import Heading from '../Layout/Heading/Heading';
import { Redirect } from 'react-router-dom';
import './Logout.css'

const Logout = () => {

	const { isAuthenticateUser } = useSelector(state => state.user);

	return (
		<Fragment>
			{!isAuthenticateUser ? <Fragment>
				<div className="logout-space"></div>
				<Heading props={"Logout Successfully..."} />
				<div className="logout-space-bottom"></div>
				<Heading props={"Thank you..."} />
			</Fragment> : <Redirect to='/account' />}

		</Fragment>
	)
}

export default Logout