/*
	Date: May 30, 2022
		* Specific Order Component.
*/

import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import './SpecificOrder.css';

const SpecificOrder = ({ match }) => {

	const orderID = match.params.id;
	const history = useHistory();

	// Getting User and it's order.
	const { isAuthenticateUser, loading } = useSelector(state => state.user);

	useEffect(() => {
		// If user is not logged in then redirect to login page.
		if (!loading) {
			if (isAuthenticateUser === false) {
				history.push('/login');
			}
		}
	}, [history, loading, isAuthenticateUser]);

	return (
		<Fragment>
			{/* Page Title */}
			<MetaData title="Order Detail..." />
			<div className='specific-order-container'>
				{/* Contain the heading and Order Number */}
				<div className='order-details-heading'>
					<h2>Order Details</h2>
					<div className='order-detail-number'>
						<div>
							Ordered On 05/26/2022 | 
						</div>
						<div>
							Order # asdasfa1212413231231
						</div>
					</div>
				</div>
				{/* Div Contain Shipping Information and Order Summery */}
				<div className='specific-order-detail-page'>
					<div className='order-details'>
						{/* Shipping Information */}
						<div className='order-shipping-info'>
							<p>Shipping Address</p>
							<p>Adarsh Dudhat</p>
							<p>825 8 Ave SW</p>
							<p>Calgary, AB, T2P 2T4</p>
							<p>Canada</p>
						</div>
						{/* Order Summery */}
						<div className='order-detail-summery'>
							<p>Order Summery</p>
							<p>Item(s) Subtotal: <span>$350</span></p>
							<p>Shipping: <span>$250</span></p>
							<p>Tax: <span>$40</span></p>
							<p>Grand Total: <span>$800</span></p>
						</div>
					</div>
				</div>
				{/* Div Containing Items Component. */}
				<div>
					Items
				</div>
			</div>
		</Fragment>
	)
}

export default SpecificOrder