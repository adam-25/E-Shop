/*	
	Date: May 12, 2022
		* Created a controller for several features on orders.
		* Getting orders, delete order or update and create a order.
*/

// Importing necessary files.
const orderModel = require('../Models/orderModel');
const productModel = require('../Models/productModel');
const ErrorHandler = require('../Utils/errorHandler');
const catchAsyncError = require('../MiddleWare/catchAsyncError');
const userModel = require('../Models/userModel');

// Create a new Order.
exports.createOrder = catchAsyncError(async (req, res, next) => {

	const order = await orderModel.create({
		customer: req.user._id,
		orderInfo: req.body.orderInfo,
		shippingInfo: req.body.shippingInfo,
		paymentInfo: req.body.paymentInfo,
		paidAt: Date.now(),
		itemPrice: req.body.itemsPrice,
		taxPrice: req.body.taxPrice,
		shippingPrice: req.body.shippingPrice,
		totalPrice: req.body.totalPrice,
	});

	res.status(200).json({ status: true, message: order });

});

// Get an Order -- ADMIN.
exports.getOneOrder = catchAsyncError(async (req, res, next) => {

	const order = await orderModel.findById(req.params.id).populate({
		path: 'customer',
		select: 'userFullName userEmail',
		model: userModel
	});

	if (!order) {
		return next(new ErrorHandler("Product has not been found with this id", 404));
	}

	res.status(200).json({ status: true, message: order })
});

// User get Orders while logged in.
exports.myOrders = catchAsyncError(async (req, res, next) => {

	const userID = req.user.id;

	const cartItems = await orderModel.find({ customer: userID });

	res.status(200).json({ status: true, cartItems: cartItems });

});

// Get all orders -- ADMIN
exports.allOrders = catchAsyncError(async (req, res, next) => {

	const orders = await orderModel.find({});

	let totalEarnings = 0;
	orders.forEach((order) => {
		totalEarnings += order.totalPrice;
	});

	res.status(200).json({ status: true, message: orders, total: totalEarnings });

});

// Update a status of an order -- ADMIN
exports.updateOrder = catchAsyncError(async (req, res, next) => {

	const order = await orderModel.findById(req.params.id);

	if (!order) {
		return next(new ErrorHandler('Order has not been found.', 404));
	}

	if (order.orderStatus === "Delivered") {
		return next(new ErrorHandler("Order is already delivered", 404));
	}

	if (order.orderStatus === "Shipped" && req.body.orderStatus === "Shipped")	{
		return next(new ErrorHandler("Order is already shipping", 404));
	}

	if (order.orderStatus === "Processing" && req.body.orderStatus === "Delivered")	{
		return next(new ErrorHandler("Order cannot directly deliver from Processing", 404));
	}

	if (order.orderStatus === "Shipped" && req.body.orderStatus === "Processing")	{
		return next(new ErrorHandler("Order cannot be processed after Shipped", 404));
	}

	if (order.orderStatus === "Processing" && req.body.orderStatus === "Processing")	{
		return next(new ErrorHandler("Order is already in Processing", 404));
	}

	order.orderStatus = req.body.orderStatus;

	if (req.body.orderStatus === "Shipped") {

		order.orderInfo.forEach(async (orderItem) => {
			await stockUpdate(orderItem.product, orderItem.itemQuantity);
		});
	}

	if (req.body.orderStatus === "Delivered") {
		order.deliveredAt = Date.now();
	};

	await order.save();
	res.status(200).json({ status: true, message: order.orderStatus });

});

// Delete an order -- ADMIN
exports.deleteOrder = catchAsyncError(async (req, res, next) => {

	let order = await orderModel.findById(req.params.id);

	if (!order) {
		return next(new ErrorHandler("Order has not been found", 404));
	}

	order = await orderModel.findByIdAndRemove(req.params.id);

	res.status(200).json({ status: true, message: "Product has been deleted successfully" });

});

// Update a product stock depend on the order.s
async function stockUpdate(id, quantity) {

	const product = await productModel.findById(id);

	product.productStock = product.productStock - quantity;
	console.log(product.productStock);

	await product.save({validateBeforeSave: false});
};