/*
	Date: May 30, 2022
		* Specific Order Component.
*/

import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSpecificOrder } from '../../Actions/orderAction';

import MetaData from '../Layout/MetaData';
import OrderItemInfoCard from '../Layout/OrderItemCard/OrderItemInfoCard';
import Loading from '../Loading/Loading';
import './SpecificOrder.css';

const SpecificOrder = ({ match }) => {

	// Get order ID from URL.
	const orderID = match.params.id;
	const history = useHistory();
	const dispatch = useDispatch();

	// Getting User and it's order.
	const { isAuthenticateUser, loading } = useSelector(state => state.user);
	const { specificOrder, loadingOrder } = useSelector(state => state.specificOrder);

	// Function which return the format of date.
	const dateOfOrder = (paidAt) => {
		let today = new Date(paidAt);
		const yyyy = today.getFullYear();
		let mm = today.getMonth() + 1; // Months start at 0!
		let dd = today.getDate();

		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;

		return today = mm + '/' + dd + '/' + yyyy;
	}

	useEffect(() => {
		// If user is not logged in then redirect to login page.
		if (!loading) {
			if (isAuthenticateUser === false) {
				history.push('/login');
			}
		}

		// Dispatch an action of specific order and passing an ID of an order.
		dispatch(getSpecificOrder(orderID));

	}, [history, loading, isAuthenticateUser, dispatch, orderID]);

	return (
		<Fragment>
			{/* Page Title */}
			{loadingOrder || loading ? <Loading /> : specificOrder && <Fragment>
				<MetaData title="Order Detail..." />
				<div className='specific-order-container'>
					{/* Contain the heading and Order Number */}
					<div className='order-details-heading'>
						<h2>Order Details</h2>
						<div className='order-detail-number'>
							<div>
								{/* Order date getting from the dateOfOrder function. */}
								Ordered On {dateOfOrder(specificOrder.paidAt)} |
							</div>
							<div>
								{/* Order Number. */}
								Order # {specificOrder._id}
							</div>
						</div>
					</div>
					{/* Div Contain Shipping Information and Order Summery */}
					<div className='specific-order-detail-page'>
						<div className='order-details'>
							{/* Shipping Information */}
							{/* Wait till shippingInfo is available and then show it. */}
							{specificOrder.shippingInfo && <div className='order-shipping-info'>
								<p>Shipping Address</p>
								<p>{specificOrder.shippingInfo.takeDeliveryFirstName + " " + specificOrder.shippingInfo.takeDeliveryLastName}</p>
								<p>{specificOrder.shippingInfo.addressToShip}</p>
								<p>{specificOrder.shippingInfo.cityToShip}, {specificOrder.shippingInfo.stateToShip}, {specificOrder.shippingInfo.countryToShip}</p>
								<p>{specificOrder.shippingInfo.postalCodeToShip}</p>
							</div>}

							{specificOrder.orderStatus && <div className='order-status-info'>
								<p>ORDER STATUS</p>
								<p>{specificOrder.orderStatus}</p>
							</div>}

							{/* Order Summery */}
							<div className='order-detail-summery'>
								<p>Order Summery</p>
								<p>Item(s) Subtotal: <span>${specificOrder.itemsPrice}</span></p>
								<p>Shipping: <span>${specificOrder.shippingPrice}</span></p>
								<p>Tax: <span>${specificOrder.taxPrice}</span></p>
								<p>Grand Total: <span>${specificOrder.totalPrice}</span></p>
							</div>
						</div>
					</div>
					{/* Div Containing Items Component. */}
					<div className='specific-order-items'>
						{specificOrder.orderInfo && specificOrder.orderInfo.map((orderItem) => <OrderItemInfoCard itemInfo={orderItem} />)}
					</div>
				</div>
			</Fragment>}
		</Fragment>
	)
}

export default SpecificOrder