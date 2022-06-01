/*
	Date: May 27, 2022
		* Create component where user can review their order and shipping information before payment.
*/

import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// Importing required components.
import MetaData from '../Layout/MetaData';
import CheckoutSteps from '../Layout/CheckoutStatus/CheckoutSteps';
import CartItemCard from '../Layout/CartItemCard/CartItemCard';
import Loading from '../Loading/Loading';
import { clearErrors } from '../../Actions/userAction';
import './ConfirmOrder.css';

// Order Review and Confirm order Component.
const OrderReviewAndConfirm = () => {

	const history = useHistory();
	const dispatch = useDispatch();

	// Getting user and cart info from the store.
	const { isAuthenticateUser, loading, error } = useSelector(state => state.user);
	const { cartItems, shippingInfo } = useSelector(state => state.cart);

	// Total of the item in cart.
	let total = 0;

	for (let i = 0; i < cartItems.length; i++) {
		total += cartItems[i].productPrice * cartItems[i].orderQuantity;
	}

	useEffect(() => {

		// If user is not logged in and try to access cart then redirect to login.
		if (!loading) {
			if (isAuthenticateUser === false) {
				history.push("/login");
			}
		}

		// If there is no items in cart and user wants to access order and review then redirect to cart.
		if (!loading) {
			if (isAuthenticateUser === true) {
				if (cartItems.length === 0)
					history.push("/cart");
			}
		}

		// If user does not enter any shipping information then redirect to shipping information.
		if (!loading) {
			if (isAuthenticateUser === true) {
				if (cartItems.length !== 0)
					if (!shippingInfo.takeDeliveryFirstName)
						history.push("/order/shippingInfo");
			}
		}

		if (error) {
			toast.error("Error: " + error);
			dispatch(clearErrors());
		}

	}, [loading, isAuthenticateUser, history, cartItems, shippingInfo.takeDeliveryFirstName, error, dispatch]);

	// Calculating total of the cart.
	const shippingCharge = total > 500 ? 0 : 50;
	const GST = total * 0.05;
	const cartTotal = shippingCharge + GST + total;

	return (
		<Fragment>
			{loading ? <Loading /> : <Fragment>
				{/* Title of the page */}
				<MetaData title="Review Order and Confirm" />
				{/* First step in the process. */}
				<CheckoutSteps step={1} />

				<div className='order-review-container'>
					<div className='shipping-information-review'>
						{/* two divs, first contain shipping information. */}
						<h2>Shipping Information</h2>
						<div className='all-shipping-info'>
							{/* Name */}
							<div className='info'>
								<h5>Delivery Person: </h5>
								<h5> {shippingInfo.takeDeliveryFirstName} {shippingInfo.takeDeliveryLastName}</h5>
							</div>
							{/* Contact Number */}
							<div className='info'>
								<h5>Contact No: </h5>
								<h5>{shippingInfo.contactNo}</h5>
							</div>
							{/* Address to ship */}
							<div className='info'>
								<h5>Address: </h5>
								<h5>{shippingInfo.addressToShip}{", " + shippingInfo.cityToShip}{",  " + shippingInfo.stateToShip}{", " + shippingInfo.countryToShip} </h5>
							</div>
							{/* Postal Code. */}
							<div className='info'>
								<h5>Postal Code: </h5>
								<h5>{shippingInfo.postalCodeToShip}</h5>
							</div>
						</div>
					</div>
					{/* All order summery. */}
					<div className='order-summery'>
						<h3>Order Summery </h3>
						<div className='all-order-info'>
							{/* Subtotal of the cart. */}
							<div className='subtotal-confirm'>
								<h5>Subtotal ({cartItems.length} item): </h5>
								<span>${total}</span>
							</div>
							{/* Total Shipping Charges. */}
							<div className='info'>
								<h5>Shipping Charges: </h5>
								<h5>${shippingCharge}</h5>
							</div>
							{/* Total GST */}
							<div className='info'>
								<h5> GST (5%): </h5>
								<h5>${GST}</h5>
							</div>
							{/* Total of the cart. */}
							<div className='info'>
								<h5> Total: </h5>
								<h5>${cartTotal}</h5>
							</div>
							{/* Button to proceed to payment. */}
							<a href="/payment" className='payment'><button>Proceed to Payment</button></a>
						</div>
					</div>
				</div>
				{/* Total items in the cart. */}
				<div className='cart-container'>
					<h2>Cart Items</h2>
					{cartItems && cartItems.map((item) => <CartItemCard item={item} />)}
				</div>
			</Fragment>}
		</Fragment>
	)
}

export default OrderReviewAndConfirm