/*	
	Date: May 12, 2022
		* Created Schema to store order details and store in DB.

	Date: May 29, 2022
		* Change the name of orderInfo and shippingInfo in Schema to match it with the frontend.
*/

// Importing necessary files.
const mongoose = require('mongoose');

// Order Schema to use to store in the DB.
const orderSchema = new mongoose.Schema({
	customer: {
		type: mongoose.Types.ObjectId,
		ref: 'user',
		required: [true, "Please enter the name of the customer"],
		strictPopulate: false
	},
	orderInfo: [
		{
			productName: {
				type: String,
				required: [true, "Please enter the name of the product"]
			},
			productPrice: {
				type: Number,
				required: [true, "Please enter the price of the product"]
			},
			orderQuantity: {
				type: Number,
				required: [true, "Please enter the quantity of the product"]
			},
			productImages: {
				type: String,
				required: true
			},
			productID: {
				type: mongoose.Schema.ObjectId,
				ref: 'product',
				required: true
			}
		}
	],
	shippingInfo: {
		takeDeliveryFirstName: {
			type: String,
			required: [true, "Please enter the first name of the customer"]
		},
		takeDeliveryLastName: {
			type: String,
			required: [true, "Please enter the last name of the customer"]
		},
		addressToShip: {
			type: String,
			required: [true, "Please enter the address of the customer"]
		},
		cityToShip: {
			type: String,
			required: [true, "Please enter the city of the customer"]
		},
		stateToShip: {
			type: String,
			required: [true, "Please enter the province of the customer"]
		},
		countryToShip: {
			type: String,
			required: [true, "Please enter the country of the customer"]
		},
		postalCodeToShip: {
			type: String,
			required: [true, "Please enter the postal code of the customer"]
		},
		contactNo: {
			type: Number,
			required: [true, "Please enter the phone number"]
		},
		emailToContact: {
			type: String,
			required: [true, "Please enter the email to contact"]
		}
	},
	paymentInfo: {
		id: {
			type: String,
			required: [true, "Please enter the payment id"]
		},
		status: {
			type: String,
			required: [true, "Please enter the payment status"]
		}
	},
	paidAt: {
		type: Date,
		required: [true, "Please enter the payment date"]
	},
	itemsPrice: {
		type: Number,
		default: 0,
		required: [true, "Please enter the items price"]
	},
	taxPrice: {
		type: Number,
		default: 0,
		required: [true, "Please enter the tax price"]
	},
	shippingPrice: {
		type: Number,
		default: 0,
		required: [true, "Please enter the shipping price"]
	},
	totalPrice: {
		type: Number,
		default: 0,
		required: [true, "Please enter the total price"]
	},
	orderStatus: {
		type: String,
		default: "Processing",
		required: [true, "Please enter the order status"]
	},
	deliverAt: Date,
		createdAt: {
			type: Date,
			default: Date.now
		}
});

// Exporting model of orderSchema.
module.exports = new mongoose.model('OrderInfo', orderSchema);