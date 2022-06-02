/*
	Date: June 1, 2022
		* Specific Order Admin Component.
*/

import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import MetaData from '../../Layout/MetaData';
import OrderItemInfoCardAdmin from "./OrderItemInfoCardAdmin";
import Loading from '../../Loading/Loading';
import { getSpecificOrder, clearErrors } from '../../../Actions/orderAction';
import { clearErrors as clearUserErrors } from '../../../Actions/userAction';
import SideBar from '../Layout/SideBar';
const SpecificOrder = ({ match }) => {

	// Get order ID from URL.
	const orderID = match.params.id;
	const history = useHistory();
	const dispatch = useDispatch();

	// Getting User and it's order.
	const { isAuthenticateUser, loading, error, user } = useSelector(state => state.user);
	const { specificOrder, loadingOrder, error: orderError } = useSelector(state => state.specificOrder);

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
		if (!window.location.hash) {
			window.location = window.location + '#loaded';
			window.location.reload();
		}

		// If admin is not logged in then redirect to login page.
		if (!loading)
			if (isAuthenticateUser === false)
				history.push('/login');

		// If user is not admin then cannot access dashboard.
		if (!loading)
			if (isAuthenticateUser === true)
				if (user.userRole !== 'admin') {
					history.push('/');
					toast("Error: Cannot Access this Resource...")
				}

		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		if (orderError) {
			toast("Error: " + orderError);
			dispatch(clearUserErrors());
		}

		// Dispatch an action of specific order and passing an ID of an order.
		dispatch(getSpecificOrder(orderID));

	}, [history, loading, isAuthenticateUser, dispatch, orderID, orderError, error, user]);

	return (
		<Fragment>
			{loadingOrder || loading ? <Loading /> : specificOrder && <Fragment>
				{/* Page Title */}
				<MetaData title="Order Detail -- ADMIN" />
				<SideBar />
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
						{specificOrder.orderInfo && specificOrder.orderInfo.map((orderItem) => <OrderItemInfoCardAdmin itemInfo={orderItem} />)}
					</div>
				</div>
			</Fragment>}
		</Fragment>
	)
}

export default SpecificOrder;