import React, { Fragment } from 'react';
import Heading from '../Layout/Heading/Heading';
import './logout.css';

const Logout = () => {
	return (
		<Fragment>
			<div className="above-logout"></div>
			<Heading props="Logout Successfully" />
			<div className="above-thank-you"></div>
			<Heading props="Thank you..." />
			<div className="below-thank-you"></div>
		</Fragment>
	)
}

export default Logout