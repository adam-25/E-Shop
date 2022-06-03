/*
	Date: June 3, 2022
		* Created Not Found Component.
*/

// Importing necessary module.
import React, { Fragment } from 'react';

// Importing CSS and Component.
import MetaData from '../Layout/MetaData';
import './notFound.css';

// Not Found Component.
const NotFound = () => {
	return (
		<Fragment>
			{/* Title of the page. */}
			<MetaData title="Page Not Found...404" />
			{/* Container of the page. */}
			<div className='not-found-container'>
				<div id="main" className='not-found-main'>
					<div className="fof">
						{/* Title of the page. */}
						<h1>Error 404</h1>
						<br />
						<br />
						{/* Button to home page. */}
						<a href="/"><button className="btn btn-pricing">HOME</button></a>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default NotFound