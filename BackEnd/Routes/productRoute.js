/*
	Date: May 8, 2022
		* All the routers relating to products.
*/

// Importing necessary files.
const express = require('express');
const router = express.Router();
const product = require('../Controllers/productController');

// Creating a route where all the products can be displayed.
router.route("/products").get(product.getAllProducts);

// Creating a route to create a new product.
router.route("/products/newProduct").post(product.createProduct);

module.exports = router;