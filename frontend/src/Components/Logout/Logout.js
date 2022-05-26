/*	
	Date: May 20, 2022
		* Logout user Component.
*/

// Importing react and other useful components.
import React, { Fragment } from 'react';
import Heading from '../Layout/Heading/Heading';
import './logout.css';

// Logout Component.
const Logout = () => {
	return (
		<Fragment>
			{/* Giving space above. */}
			<div className="above-logout"></div>
			<Heading props="Logout Successfully" />
			{/* Giving space below. */}
			<div className="above-thank-you"></div>
			<Heading props="Thank you..." />
			<div className="below-thank-you"></div>
		</Fragment>
	)
}

export default Logout