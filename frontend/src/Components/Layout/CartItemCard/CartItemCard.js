import React, { Fragment, useState } from 'react'
import './cartItemCard.css';
import { addToCart } from '../../../Actions/cartActions';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const CartItemCard = ({ item }) => {

	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(item.quantity);

	function reduceQuantity() {
		if (quantity === 1) {
			setQuantity(quantity);
		}
		else {
			const temp = quantity - 1;
			setQuantity(temp);
			dispatch(addToCart(item.id, quantity));
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
			dispatch(addToCart(item.id, quantity));
			toast(item.productName + " Quantity Updated In Cart.")
		}
	}

	return (
		<Fragment>
			<div className="cart-item-card-container">
				<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt="Product In Cart" />
				<div className='cart-item-card-info'>
					<h5>{item.productName}</h5>
					<h1>${item.productPrice}</h1>
					<div className="specific-product-quantity">
						<button onClick={reduceQuantity}>-</button>
						<input type="number" value={quantity} readOnly />
						<button onClick={addQuantity}>+</button>
					</div>
					<p style={{ marginTop: '5px' }}>Remove</p>
				</div>
			</div>
		</Fragment>
	)
}

export default CartItemCard