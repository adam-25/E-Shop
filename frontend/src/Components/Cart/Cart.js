import React, { Fragment, useEffect } from 'react'
import './cart.css';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import CartItemCard from '../Layout/CartItemCard/CartItemCard';

const Cart = () => {

	const history = useHistory();
	const { isAuthenticateUser, loading } = useSelector(state => state.user);
	const { cartItems } = useSelector(state => state.cart);

	let total = 0;

	for (let i = 0; i < cartItems.length; i++) {
		total += cartItems[i].productPrice * cartItems[i].orderQuantity;
	}

	useEffect(() => {
		if (!loading) {
			if (isAuthenticateUser === false) {
				history.push("/login");
			}
		}
	}, [loading, isAuthenticateUser, history, cartItems]);

	return (
		<Fragment>
			<div className="cart-container">
				<h2>Shopping Cart</h2>
				<hr />
				{cartItems.length === 0 && <div className="cart-empty">
					<p>No Items In Cart.</p>
					<a href="/products" className="view-product-btn"> View Products </a>
				</div>}
				{cartItems && cartItems.map((item) => <CartItemCard item={item} />)}
				<div className="cart-total-price">
					<hr/>
					<h3>Subtotal ({cartItems.length} item): <span>${total}</span></h3>
					<a href="/Checkout"><button className="proceed-checkout" disabled={total === 0}>Proceed to Checkout</button></a>
				</div>
			</div>

		</Fragment>
	)
}

export default Cart