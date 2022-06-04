/*
	Date: May 29, 2022
		* Create a Component for each order for user.

	Date: May 30, 2022
		* Add Order Status to each order of user.
*/

// Importing necessary modules.
import React, { Fragment } from 'react';

// Importing necessary components.
import OrderItemInfoCard from "./OrderItemInfoCard.js";
import "./OrderItemCard.css";

// Each Order Card
const OrderItemCard = ({ orderItem }) => {

	// Date when order is created in mm/dd/yyyy format.
	let today = new Date(orderItem.paidAt);
	const yyyy = today.getFullYear();
	let mm = today.getMonth() + 1; // Months start at 0!
	let dd = today.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	today = mm + '/' + dd + '/' + yyyy;

	return (
		<Fragment>
			<div className='order-container-info'>
				<div className='order-detail-container'>
					<div className='order-information'>
						<div>
							<div className='order-info'>
								{/* Order placed date */}
								<p>ORDER PLACED</p>
								<p>{today}</p>
							</div>
							{/* Total of the order */}
							<div className='order-info'>
								<p>TOTAL</p>
								<p>{orderItem.totalPrice}</p>
							</div>
							{/* Ship to name of the person */}
							<div className='order-info'>
								<p>SHIP TO</p>
								<p>{orderItem.shippingInfo.takeDeliveryFirstName + " "}
									{orderItem.shippingInfo.takeDeliveryLastName}</p>
							</div>
						</div>
						<div>
							<div className='order-info'>
								<p>ORDER STATUS</p>
								<p> <b className={orderItem.orderStatus !== "Delivered" ? "red-color" : "green-color"}>{orderItem.orderStatus}</b></p>
							</div>
						</div>
					</div>
					{/* Order Number and link to view details of order */}
					<div className='order-number'>
						<p>ORDER # {orderItem._id}</p>
						<a href={"/orderDetail/" + orderItem._id}>View Order Details</a>
					</div>
				</div>
				{/* Each item in Order */}
				<div className='order-items-container'>
					{orderItem.orderInfo && orderItem.orderInfo.map((orderItemInfo) => <OrderItemInfoCard itemInfo={orderItemInfo} />)}
				</div>
			</div>
		</Fragment>
	)
}

export default OrderItemCard