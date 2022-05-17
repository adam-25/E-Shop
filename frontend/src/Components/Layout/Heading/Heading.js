/*
	Date: 15 May, 2022
		* Created Heading Component.
*/

// Importing CSS files.
import React from 'react';
import './headingStyle.css';

// Getting Heading.
const Heading = ({props}) => {
	return (
		<h2 className="heading-title">
			{props}
		</h2>
	)
}

export default Heading