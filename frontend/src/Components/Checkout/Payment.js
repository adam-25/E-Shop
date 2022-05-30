/*
	Date: May 28, 2022
		* Payment with the stripe API.
		* Payment Component.
	
	Date: May 29, 2022
		* Payment Page only open when shipping information provided and cart is not empty.
*/

// Importing necessary modules.
import React, { Fragment, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Importing necessary components.
import CheckoutSteps from '../Layout/CheckoutStatus/CheckoutSteps';
import MetaData from '../Layout/MetaData';
import './payment.css';

// Importing components required for payment from stripe module.
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Importing Icons.
import CreditCardIcon from '@mui/icons-material/CreditCard';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { createOrder } from '../../Actions/orderAction';

const Payment = () => {

	let history = useHistory();
	const dispatch = useDispatch();

	// Getting current cart items and shipping information.
	const { shippingInfo, cartItems } = useSelector(state => state.cart);
	const { user, loading, isAuthenticateUser } = useSelector(state => state.user);

	// Calculating total of the cart and store it in total.
	let subTotal = 0;

		// Calculating total of the cart.
	for (let i = 0; i < cartItems.length; i++) {
		subTotal += cartItems[i].productPrice * cartItems[i].orderQuantity;
	}

	const shippingCharge = subTotal > 500 ? 0 : 50;
	const GST = subTotal * 0.05;
	const total = shippingCharge + GST + subTotal;

	// Require component for payment using stripe API.
	const stripe = useStripe();
	const elements = useElements();
	const paymentButton = useRef(null);

	// Setting up amount to send to stripe for record.
	const paymentData = {
		amount: Math.round(total * 100)
	}

	const newOrder = {
		orderInfo: cartItems,
		shippingInfo: shippingInfo,
		itemsPrice: subTotal,
		taxPrice: GST,
		shippingPrice: shippingCharge,
		totalPrice: total,
	}

	// function call when payment button is clicked.
	const paymentSubmitted = async (e) => {
		e.preventDefault();

		// when pay button is clicked make it disable to not rerender again and again.
		paymentButton.current.disabled = true;

		// Try to make payment successful.
		try {
			// Config to send to backend.
			const config = {
				headers: {"Content-Type": "application/json"}
			}

			// Send data and amount to backend to create and process the payment.
			const { data } = await axios.post("/api/v1/payment/processPayment", paymentData, config);

			// Getting client secret key from the backend.
			const client_secret = data.client_secret;

			// If we have no stripe or element then return.
			if (!stripe || !elements) return;

			// Confirming the payment of card.
			const result = await stripe.confirmCardPayment(client_secret, {
				// Selecting payment method with card detail, and billing detail.
				// billing detail and shipping detail will remain the same.
				payment_method: {
					card: elements.getElement(CardNumberElement),
					billing_details: {
						name: user.userFullName,
						email: user.userEmail,
						address: {
							line1: shippingInfo.addressToShip,
							city: shippingInfo.cityToShip,
							state: shippingInfo.stateToShip,
							postal_code: shippingInfo.postalCodeToShip,
							country: shippingInfo.countryToShip
						},
					},
				}
			});

			// if error occurs then make button enable again.
			if (result.error) {
				paymentButton.current.disabled = false;
				toast(result.error.message);
			}

			// If payment is successful then redirect to the order confirmation page.
			else if (result.paymentIntent.status === "succeeded") {
				
				newOrder.paymentInfo = {
					id: result.paymentIntent.id,
					status: result.paymentIntent.status,
				};

				newOrder.shippingInfo.emailToContact = user.userEmail;
				dispatch(createOrder(newOrder));

				history.push("/success");
			}
			// If payment is failed then show the following line.
			else {
				toast("Issue while processing your payment, Try again later...");
			}

		} 
		// If there is error then make button enable and show the error.
		catch (error) {
			paymentButton.current.disabled = false;
			toast(error.message);
		}
	}

	useEffect(() => {
		// If user is not logged in and try to access cart then redirect to login.
		if (!loading) {
			if (isAuthenticateUser === false) {
				history.push("/login");
			}
		}

		// If there is no items in cart and user wants to access order and review then redirect to cart.
		if (!loading)	{
			if (isAuthenticateUser === true)	{
				if (cartItems.length === 0)
					history.push("/cart");
			}
		}

		// If user does not enter any shipping information then redirect to shipping information.
		if (!loading)	{
			if (isAuthenticateUser === true)	{
				if (cartItems.length !== 0)
					if (!shippingInfo.takeDeliveryFirstName)
						history.push("/order/shippingInfo");
			}
		}
	}, [loading, isAuthenticateUser, history, cartItems]);

	return (
		<Fragment>
			{/* Title of the page */}
			<MetaData title="Payment..." />

			{/* Checkout step. */}
			<CheckoutSteps step={2} />

			{/* Full form */}
			<form className='card-info-form' onSubmit={paymentSubmitted}>

				{/* Heading of the page. */}
				<h2>Card Information</h2>
				{/* Container which have all the information of the page. */}
				<div className='card-info-container'>
					{/* Card Number */}
					<div className='icon-detail'>
						<CreditCardIcon />
						<CardNumberElement className="card-details" />
					</div>
					{/* Expiry date */}
					<div className='icon-detail'>
						<DateRangeIcon />
						<CardExpiryElement className="card-details" />
					</div>
					{/* CVC of the card */}
					<div className='icon-detail'>
						<VpnKeyIcon />
						<CardCvcElement className="card-details" />
					</div>
					{/* Button to process. */}
					<button type='submit' ref={paymentButton} >Pay - ${total}</button>
				</div>
			</form>
		</Fragment>
	)
}

export default Payment