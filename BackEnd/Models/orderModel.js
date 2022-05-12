/*	
	Date: May 1w, 2022
		* Created Schema to store order details and store in DB.
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
			itemName: {
				type: String,
				required: [true, "Please enter the name of the product"]
			},
			itemPrice: {
				type: Number,
				required: [true, "Please enter the price of the product"]
			},
			itemQuantity: {
				type: Number,
				required: [true, "Please enter the quantity of the product"]
			},
			itemImage: {
				type: String,
				required: true
			},
			product: {
				type: mongoose.Schema.ObjectId,
				ref: 'product',
				required: true
			}
		}
	],
	shippingInfo: {
		customerAddress: {
			type: String,
			required: [true, "Please enter the address of the customer"]
		},
		customerCity: {
			type: String,
			required: [true, "Please enter the city of the customer"]
		},
		customerProvince: {
			type: String,
			required: [true, "Please enter the province of the customer"]
		},
		customerCountry: {
			type: String,
			required: [true, "Please enter the country of the customer"]
		},
		customerPostalCode: {
			type: String,
			required: [true, "Please enter the postal code of the customer"]
		},
		phoneNumber: {
			type: Number,
			required: [true, "Please enter the phone number"]
		},
		emailToContact: {
			type: String,
			required: [true, "Please enter the email to contact"]
		}
	},
	paymentInfo: {
		method: {
			type: String,
			required: [true, "Please enter the payment method"]
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
	itemPrice: {
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