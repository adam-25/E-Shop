/*
	Date: May 23, 2022
		* Component of the items in Cart.
		* All Items in Cart has it's own CartItemCard Component.
*/

import React, { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

// Importing Components and actions.
import './cartItemCard.css';
import { addToCart, removeItemCart } from '../../../Actions/cartActions';


const CartItemCard = ({ item }) => {

	// Can change quantity in cart as well with setting quantity.
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(item.orderQuantity);

	// Remove item from the cart.
	const removeItem = () => {
		dispatch(removeItemCart(item.productID));
		toast(item.productName + " has been Removed from Cart.")
	}

	// Reduce the quantity of the product in cart.
	function reduceQuantity() {
		if (quantity === 1) {
			setQuantity(quantity);
		}
		else {
			const temp = quantity - 1;
			setQuantity(temp);
			dispatch(addToCart(item.productID, temp));
			toast(item.productName + " Quantity Updated In Cart.")
		}
	}

	// Increase the quantity of item in cart.
	function addQuantity() {
		if (item.productStock <= quantity) {
			setQuantity(quantity);
			toast("Only " + item.productStock + " product in Stock.")
		}
		else {
			const temp = quantity + 1;
			setQuantity(temp);
			dispatch(addToCart(item.productID, temp));
			toast(item.productName + " Quantity Updated In Cart.")
		}
	}

	return (
		<Fragment>
			<div className="cart-item-card-container">
				{/* Image of the product which will be the link which take to the product description */}
				<a href={"/product/" + item.productID}>
					<img src={item.productImages} alt={item.productName} />
				</a>
				<div className='cart-item-card-info'>
					{/* Name of the product which will be the link which take to the product description */}
					<a href={"/product/" + item.productID}>
						<h4>{item.productName}</h4>
					</a>
					{/* Product Price and Quantity buttons */}
					<h1>${item.productPrice}</h1>
					<div className="specific-product-quantity">
						<button onClick={reduceQuantity}>-</button>
						<input type="number" value={quantity} readOnly />
						<button onClick={addQuantity}>+</button>
					</div>
					<p style={{ marginTop: '5px' }} onClick={removeItem} >Remove</p>
				</div>
			</div>
		</Fragment>
	)
}

export default CartItemCard