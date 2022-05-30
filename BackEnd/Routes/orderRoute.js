/*	
	Date: May 12, 2022
		* Add Routes of order to perform different functionalities with an order.
*/

// Importing necessary files.
const express = require('express');
const { isAuthenticateUser, isAdmin } = require('../MiddleWare/Authentication');
const order = require('../Controllers/orderController');
const router = express.Router();

// Creating a new Order by user while logged in.
router.route("/order/newOrder").post(isAuthenticateUser, order.createOrder);

// Search for a specific order with ID -- ADMIN
router.route("/order/:id").get(isAuthenticateUser, order.getOneOrder);

// Get cart of an user.
router.route("/myOrder").get(isAuthenticateUser, order.myOrders);

// Get all orders -- ADMIN
router.route("/admin/order").get(isAuthenticateUser, isAdmin("admin"), order.allOrders);

// Update or Delete an existing order -- ADMIN
router.route("/admin/order/:id").delete(isAuthenticateUser, isAdmin("admin"), order.deleteOrder)
.put(isAuthenticateUser, isAdmin("admin"), order.updateOrder);

module.exports = router;