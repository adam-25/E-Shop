/*
	Date: May 29, 2022
		* Created Success Component.

		- Required to add when it should render.
*/

// Importing necessary modules.
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

// Importing Components.
import MetaData from '../Layout/MetaData';
import './OrderPlace.css';

const OrderPlaceSuccess = () => {

	return (
		<Fragment>
			{/* Title of the page */}
			<MetaData title="Order Place Successfully" />
			{/* Main Container */}
			<div className='success-container'>
				{/* Container of the card. */}
				<div className="card">
					{/* Circle around check symbol */}
					<div style={{ borderRadius: "200px", height: "200px", width: "200px", backgroundColor: "#F8FAF5", margin: "0 auto" }}>
						{/* CheckMark Symbol */}
						<i className="check-mark">✓</i>
					</div>
					{/* Success Heading */}
					<h1>Success</h1>
					<p>Your order has been placed Successfully...</p>
					{/* Button goes to orders. */}
					<div className='btn-container'>
						<a href="/myOrders" className="view-orders-btn"> View Your Order </a>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default OrderPlaceSuccess;