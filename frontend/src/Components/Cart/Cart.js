/*
	Date: May 23, 2022
		* Cart Component.
*/

import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

// Importing required components.
import CartItemCard from '../Layout/CartItemCard/CartItemCard';
import MetaData from '../Layout/MetaData';
import './cart.css';

// Cart Component.
const Cart = () => {

	const history = useHistory();

	// Getting user and cart info from the store.
	const { isAuthenticateUser, loading, user } = useSelector(state => state.user);
	const { cartItems } = useSelector(state => state.cart);

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
	}, [loading, isAuthenticateUser, history, cartItems]);

	return (
		<Fragment>
			{/* Title of the page. */}
			{user && <MetaData title={user.userFirstName + "'s Cart..."} />}
			<div className="cart-container">
				<h2>Shopping Cart</h2>
				<hr />
				{/* If cart is empty then show this. */}
				{cartItems.length === 0 && <div className="cart-empty">
					<p>No Items In Cart.</p>
					<a href="/products" className="view-product-btn"> View Products </a>
				</div>}
				{/* If cart is not empty show every item as CartItemCard. */}
				{cartItems && cartItems.map((item) => <CartItemCard item={item} />)}
				<div className="cart-total-price">
					<hr />
					{/* Subtotal and Link to Checkout. */}
					<h3>Subtotal ({cartItems.length} item): <span>${total}</span></h3>
					<a href="/order/shippingInfo"><button className="proceed-checkout" disabled={total === 0}>Proceed to Checkout</button></a>
				</div>
			</div>

		</Fragment>
	)
}

export default Cart