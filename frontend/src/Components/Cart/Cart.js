import React, { Fragment, useEffect } from 'react'
import './cart.css';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import CartItemCard from '../Layout/CartItemCard/CartItemCard';

const Cart = () => {

	const history = useHistory();
	const { isAuthenticateUser, loading } = useSelector(state => state.user);

	useEffect(() => {
		if (!loading) {
			if (isAuthenticateUser === false) {
				history.push("/login");
			}
		}
	}, [loading, isAuthenticateUser, history]);

	const product = [{
		productName: "MacBook Air",
		productPrice: 1000,
		productImage: "hello",
		quantity: 1,
		productStock: 5
	},
	{
		productName: "MacBook Air",
		productPrice: 1000,
		productImage: "hello",
		quantity: 1,
		productStock: 5
	},
	]

	return (
		<Fragment>
			<div className="cart-container">
				<h2>Shopping Cart</h2>
				<hr />
				{product.map((item) => <CartItemCard item={item} />)}
				<div className="cart-total-price">
					<hr/>
					<h3>Subtotal (1 item): <span>$1000</span></h3>
					<a href="/Checkout" className="proceed-checkout">Proceed to Checkout</a>
				</div>
			</div>

		</Fragment>
	)
}

export default Cart