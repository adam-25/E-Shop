/*
	Date: May 8, 2022
		* Controls the operation on Products.
		* Get All Products, Create a new Product, Update a Product, Remove Product.
	
	Date: May 11, 2022
		* Add Methods to create or update, delete a review, of a product.
		* Get all Reviews of a product.
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

// Create or update a review of a product.
exports.updateOrCreateReview = asyncCatch (async (req, res, next) => {

	const userID = req.user.id;
	const userName = req.user.userFullName;

	const rating = Number(req.body.rating);
	const comment = req.body.comment;
	const productID = req.body.productID;

	const product = await productModel.findById(productID);

	let isReviewed = false;

	product.productReview.forEach( function (review) {
		if (review.reviewerName === userName)
		{
			isReviewed = true;
		}
	});

	if (isReviewed)	{
		product.productReview.forEach(async (review) => {
			if (review.reviewerName === userName)
			{
				review.ratingOfTheProduct = rating;
				review.commentOnProduct = comment;
			}
		});

		product.productRating = updateOverallReview(product);
		await product.save({validateBeforeSave: false});
		res.status(200).json({status: true, message: "Review Updated successfully"});
	}
	else {
		product.productReview.push({reviewerID: userID, reviewerName: userName, ratingOfTheProduct: rating, commentOnProduct: comment});

		product.productNumOfReviews = product.productReview.length;
		
		product.productRating = updateOverallReview(product);
		await product.save();
		res.status(200).json({status: true, message: "Review Added successfully"});
	}
});

// Getting all the reviews of a product.
exports.getAllReviews = asyncCatch (async (req, res, next) => {

	const productID = req.query.id;

	const product = await productModel.findById(productID);

	if (!product) {
		return next(new ErrorHandler("Product Not Found", 404));
	};

	res.status(200).json({status: true, message: product.productReview});
});

// Deleting specific review of a product.
exports.deleteReview = asyncCatch (async (req, res, next) => {

	const productID = req.query.productID;
	const product = await productModel.findById(productID);

	if (!product) {
		return next(new ErrorHandler("Product Not Found", 404));
	};

	let index = 0;

	for (let i = 0; i < product.productReview.length; i++)	{
		if (req.query.id === product.productReview[i].id)
		{
			index = i;
			break;
		}
	};

	product.productReview.splice(index, 1);

	product.productNumOfReviews = product.productReview.length;
	product.productRating = updateOverallReview(product);
	await product.save();

	res.status(200).json({status: true, message: "Product Review has been deleted successfully."});

});

// return an average rating of a product.
function updateOverallReview(product) {

	let avg = 0;
	let totalRating = 0;

	product.productReview.forEach((review) => {
		totalRating += review.ratingOfTheProduct;
	});

	avg = totalRating / product.productReview.length;

	return avg;
}