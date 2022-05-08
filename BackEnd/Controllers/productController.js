/*
	Date: May 8, 2022
		* Controls the operation on Products.
		* Get All Products, Create a new Product.
*/ 

// Importing necessary files.
const productModel = require("../Models/productModel")

// Creating a new Product in DB.
exports.createProduct = (req, res, next) => {

	const newProduct = productModel.create(req.body);

	res.status(200).json({status: "Success", createdProduct: newProduct});
};

// Extracting all the Products from the DB.
exports.getAllProducts = (req, res, next) => {
	res.status(200).json({status: "Successfully retrieved all products"});
};