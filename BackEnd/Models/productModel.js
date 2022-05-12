/* 	
	File: Product Model.
	Date: May 8, 2022.
		* Schema of the product.
*/

// Importing necessary files for route.
const mongoose = require('mongoose');


// Product Schema
const productSchema = new mongoose.Schema({
	productName: {
		type: String,
		required: [true, "Please enter a product name"],
		trim: true
	},
	productDescription: {
		type: String,
		required: [true, "Please enter a product description"]
	},
	productPrice: {
		type: Number,
		required: [true, "Please enter a product price"],
		maxLength: [10, "Price must be between 0 and 10, inclusive"]
	},
	productRating: {
		type: Number,
		default: 0
	},
	productImages: [
		{
			imagePublicId: {
				type: String,
				required: true
			},
			imageURL: {
				type: String,
				required: true
			}
		}
	],
	productCategory: {
		type: String,
		required: [true, "Please enter a category of the product"]
	},
	productStock: {
		type: Number,
		required: [true, "Please enter a stock of the product"],
		maxLength: [5, "Maximum stock is 100000 of one item"],
		default: 1
	},
	productNumOfReviews: {
		type: Number,
		default: 0	
	},
	productReview: [
		{
			reviewerID: {
				type: mongoose.Schema.ObjectId,
				ref: "user",
				required: true
			},
			reviewerName: {
				type: String,
				required: true
			},
			ratingOfTheProduct: {
				type: Number,
				required: true
			},
			commentOnProduct: {
				type: String,
				required: false
			}
		}
	],
	userCreatedProduct: {
		type: mongoose.Schema.ObjectId,
		reference: "user",
		required: true
	},
	CreatedTimeOfProduct: {
		type: Date,
		date: Date.now()
	}

});

module.exports = mongoose.model('Product', productSchema);