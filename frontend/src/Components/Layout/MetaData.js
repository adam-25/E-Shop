/*	
	Date: May 16, 2022
		* Set title for the page where it is called.
*/
import React from 'react';
import Helmet from 'react-helmet';

const MetaData = ({ title }) => {
	return (
		<Helmet>
			<title>{title}</title>
		</Helmet>
	)
}

export default MetaData