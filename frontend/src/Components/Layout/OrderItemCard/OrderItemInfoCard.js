/*
	Date: May 29, 2022
		* Item Component of order.
*/

// Importing necessary modules.
import React, { Fragment } from 'react';

// Importing CSS file.
import "./OrderItemCard.css";

// Item component of particular order.
const OrderItemInfoCard = ({ itemInfo }) => {
	return (
		<Fragment>
			<div className='order-product-info'>
				{/* Item Image and link to product */}
				<a href={"/product/" + itemInfo.productID}>
					<img src={itemInfo.productImages} alt={itemInfo.productName} />
				</a>
				{/* Item information */}
				<div className='order-item-info'>
					{/* Order item name with link to product */}
					<a href={"/product/" + itemInfo.productID}>
						<h4>
							{itemInfo.productName}
						</h4>
					</a>
					{/* Item price and Quantity and But again button with link to product. */}
					<h1>${itemInfo.productPrice}</h1>
					<p>QTY: {itemInfo.orderQuantity}</p>
					<a href={"/product/" + itemInfo.productID}><button className="buy-product-again">Buy it Again</button></a>
				</div>
			</div>
			{/* Line for design */}
			<hr style={{marginBottom: "-1px", width: "98%"}} />
		</Fragment>
	)
}

export default OrderItemInfoCard