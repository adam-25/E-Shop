/*
	Date: June 1, 2022
		* Item Component of specific order.
*/

// Importing necessary modules.
import React, { Fragment } from 'react';

// Item component of particular order.
const OrderItemInfoCardAdmin = ({ itemInfo }) => {
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
					{/* Item price and Quantity of ordered item. */}
					<h1>${itemInfo.productPrice}</h1>
					<p>QTY: {itemInfo.orderQuantity}</p>
				</div>
			</div>
			{/* Line for design */}
			<hr style={{marginBottom: "-1px", width: "98%"}} />
		</Fragment>
	)
}

export default OrderItemInfoCardAdmin