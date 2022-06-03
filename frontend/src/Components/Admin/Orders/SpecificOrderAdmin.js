/*
	Date: June 1, 2022
		* Specific Order Admin Component.
*/

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// For Select Button.
import Select from 'react-select';

import MetaData from '../../Layout/MetaData';
import OrderItemInfoCardAdmin from "./OrderItemInfoCardAdmin";
import Loading from '../../Loading/Loading';
import SideBar from '../Layout/SideBar';
import { adminUpdateOrder, clearErrors as clearUpdateErrors } from '../../../Actions/Admin/adminOrderAction';
import { getSpecificOrder, clearErrors } from '../../../Actions/orderAction';
import { clearErrors as clearUserErrors } from '../../../Actions/userAction';
import { ADMIN_ORDER_DELETE_RESET } from '../../../Constants/Admin/adminOrderConstants';
import './SpecificOrderAdmin.css';

const SpecificOrder = ({ match }) => {

	// Get order ID from URL.
	const orderID = match.params.id;
	const history = useHistory();
	const dispatch = useDispatch();

	// Getting User and it's order.
	const { isAuthenticateUser, loading, error, user } = useSelector(state => state.user);
	const { specificOrder, loadingOrder, error: orderError } = useSelector(state => state.specificOrder);
	const { status, loading: updateLoading, error: updateError } = useSelector(state => state.adminUpdateOrder);

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

	const [orderCurrentStatus, setOrderCurrentStatus] = useState('');

	const updateOrderStatus = (e) => {
		e.preventDefault();

		if (specificOrder.orderStatus === "Processing" && orderCurrentStatus.value === "Delivered") {
			toast("Order Cannot be Delivered Directly from Processing...");
			return;
		}
		
		dispatch(adminUpdateOrder(orderCurrentStatus.value, match.params.id));
	}

	useEffect(() => {
		// If admin is not logged in then redirect to login page.
		if (!loading)
			if (isAuthenticateUser === false)
				history.push('/login');

		// If user is not admin then cannot access specific order.
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

		if (updateError) {
			toast("Error: " + updateError);
			dispatch(clearUpdateErrors());
		}

		if (status === true) {
			dispatch({ type: ADMIN_ORDER_DELETE_RESET });
			history.push('/admin/orders');
		}

		// Dispatch an action of specific order and passing an ID of an order.
		dispatch(getSpecificOrder(orderID));

	}, [history, loading, isAuthenticateUser, dispatch, orderID, orderError, error, user, status, updateError]);

	return (
		<Fragment>
			{loadingOrder || loading || updateLoading ? <Loading /> : specificOrder && <Fragment>
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
								<div>
									<p>ORDER STATUS</p>
									<p className={specificOrder.orderStatus === "Delivered" ? "green-color" : "red-color"}>{specificOrder.orderStatus}</p>
								</div>
								<div className='orderStatus-update' style={specificOrder.orderStatus === "Delivered" ? {display: "none"} : {display: "block"}}>
									<div>
										<Select
											options={specificOrder.orderStatus === "Processing" ? [{ value: "Shipped", label: "Shipped" }, { value: "Delivered", label: "Delivered" }] : specificOrder.orderStatus === "Shipped" ? [{ value: "Delivered", label: "Delivered" }] : specificOrder.orderStatus === "Delivered" ? [{}] : [{}]}
											defaultValue={orderCurrentStatus.value}
											onChange={setOrderCurrentStatus}
										/>
									</div>
									<button onClick={updateOrderStatus} disabled={updateLoading === true ? true : false || (orderCurrentStatus.value === 'Delivered' || orderCurrentStatus.value === 'Shipped') ? false : true} >Update Status</button>
								</div>
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