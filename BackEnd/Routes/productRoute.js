/*
	Date: May 8, 2022
		* All the routers relating to products.
*/

// Importing necessary files.
const express = require('express');
const router = express.Router();
const product = require('../Controllers/productController');
const { isAuthenticateUser, isAdmin } = require('../MiddleWare/Authentication');

// Creating a route where all the products can be displayed.
router.route("/products").get(product.getAllProducts);

// Creating a route to create a new product.
router.route("/products/newProduct").post(isAuthenticateUser, isAdmin("admin"), product.createProduct);

// Update a existing product.
router.route("/products/:id").put(isAuthenticateUser, isAdmin("admin"), product.updateProduct).delete(isAuthenticateUser, isAdmin("admin"), product.deleteProduct).get(product.getOneProduct);

module.exports = router;