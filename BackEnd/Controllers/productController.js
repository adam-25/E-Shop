/*
	Date: May 8, 2022
		* Controls the operation on Products.
		* Get All Products, Create a new Product, Update a Product, Remove Product.
*/

// Importing necessary files.
const productModel = require("../Models/productModel");
const ErrorHandler = require("../Utils/errorHandler");
const asyncCatch = require("../MiddleWare/catchAsyncError");
const apiFeature = require("../Utils/features");

// Creating a new Product in DB. -- ADMIN ONLY
exports.createProduct = asyncCatch(async (req, res, next) => {

	req.body.userCreatedProduct = req.user.id;

	const newProduct = await productModel.create(req.body);

	res.status(200).json({ status: "Success", createdProduct: newProduct });
});

// Update a Product in DB. -- ADMIN ONLY
exports.updateProduct = asyncCatch(async (req, res, next) => {
	let updateProduct = await productModel.findById(req.params.id);

	if (!updateProduct) {
		return next(new ErrorHandler("Product Not Found", 404));
	} else {
		updateProduct = await productModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
				useFindAndModify: false,
			}
		);
		res.status(200).json({ status: "Updated Successfully" });
	}
});

// Delete a product in DB. -- ADMIN ONLY
exports.deleteProduct = asyncCatch(async (req, res, next) => {
	let deleteProduct = await productModel.findById(req.params.id);

	if (!deleteProduct) {
		return next(new ErrorHandler("Product Not Found", 404));
	} else {
		deleteProduct = await productModel.findByIdAndRemove(req.params.id);
		res.status(200).json({ status: "Deleted Successfully" });
	}
});

// Getting particular product from DB by ID.
exports.getOneProduct = asyncCatch(async (req, res, next) => {
	const oneProduct = await productModel.findById(req.params.id);

	if (!oneProduct) {
		return next(new ErrorHandler("Product Not Found", 404));
	} else {
		res.status(200).json({ status: "True", message: oneProduct });
	}
});

// Extracting all the Products from the DB.
exports.getAllProducts = asyncCatch(async (req, res, next) => {

	const resultPerPage = 5;

	const totalProducts = await productModel.countDocuments();

	const apiFeatureObj = new apiFeature(productModel.find(), req.query)
		.search()
		.filter()
		.productPerPage(resultPerPage);

	const allProducts = await apiFeatureObj.query;

	res.status(200).json({
		status: "Successfully retrieved all products",
		products: allProducts,
		totalProducts: totalProducts
	});
});
