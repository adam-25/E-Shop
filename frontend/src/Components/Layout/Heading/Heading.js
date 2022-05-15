import React from 'react';
import './headingStyle.css';

const Heading = ({props}) => {
	return (
		<h2 className="heading-title">
			{props}
		</h2>
	)
}

export default Heading