import React, { Fragment, useState } from 'react'
import './cartItemCard.css';
import { addToCart, removeItemCart } from '../../../Actions/cartActions';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const CartItemCard = ({ item }) => {

	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(item.orderQuantity);

	const removeItem = () => {
		dispatch(removeItemCart(item.productID));
		toast(item.productName + " has been Removed from Cart.")
	}

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
				<img src={item.productImages} alt={item.productName} />
				<div className='cart-item-card-info'>
					<h4>{item.productName}</h4>
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