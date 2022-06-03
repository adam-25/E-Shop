/*
	Date: May 8, 2022
		* Controls the operation on Products.
		* Get All Products, Create a new Product, Update a Product, Remove Product.
	
	Date: May 11, 2022
		* Add function to create or update, delete a review, of a product.
		* Get all Reviews of a product.
		* Add function to sort products in either ascending or descending.

	Date: May 18, 2022
		* Add Pagination.
		* Make resultsPerPage Global.
		* Return categories and total products when searching products.

	Date: May 31, 2022
		* Add function for admin to get all products.

	Date: June 1, 2022
		* Add Images to Cloudinary in createProduct function.
		* Delete product image from cloudinary when product is deleted.
		* Created a function to get random products for the carousel.
		* Created a function to get top 8 products for home page.
		* Create a function to get highest selling products.
		* Update Product with Images.
*/

// Importing necessary files.
const productModel = require("../Models/productModel");
const ErrorHandler = require("../Utils/errorHandler");
const asyncCatch = require("../MiddleWare/catchAsyncError");
const apiFeature = require("../Utils/features");

const cloudnary = require('cloudinary');

const resultsPerPage = 6;

// Creating a new Product in DB. -- ADMIN ONLY
exports.createProduct = asyncCatch(async (req, res, next) => {
	let productImages = [];

	if (typeof req.body.productImages === "string") {
		productImages.push(req.body.productImages);
	}
	else {
		productImages = req.body.productImages;
	}

	let productImageURL = [];

	for (let i = 0; i < productImages.length; i++) {
		const result = await cloudnary.v2.uploader.upload(productImages[i],
			{ folder: "PRODUCTS_IMAGE" }
		);

		productImageURL.push({
			imagePublicId: result.public_id,
			imageURL: result.secure_url
		});
	}

	req.body.productImages = productImageURL;

	req.body.userCreatedProduct = req.user.id;

	await productModel.create(req.body);

	res.status(200).json({ status: true });
});

// Update a Product in DB. -- ADMIN ONLY
exports.updateProduct = asyncCatch(async (req, res, next) => {

	let updateProduct = await productModel.findById(req.params.id);


	if (!updateProduct) {
		return next(new ErrorHandler("Product Not Found", 404));
	}

	let productImages = [];

	// Get all Images in productImages.
	if (typeof req.body.productImages === "string") {
		productImages.push(req.body.productImages);
	}
	else {
		productImages = req.body.productImages;
	}

	// Destroy the product image in cloudinary.
	for (let i = 0; i < updateProduct.productImages.length; i++) {
		await cloudnary.v2.uploader.destroy(updateProduct.productImages[i].imagePublicId);
	}

	// All New Product images which we get from the front end to cloudinary.
	let productImageURL = [];

	for (let i = 0; i < productImages.length; i++) {
		const result = await cloudnary.v2.uploader.upload(productImages[i],
			{ folder: "PRODUCTS_IMAGE" }
		);

		productImageURL.push({
			imagePublicId: result.public_id,
			imageURL: result.secure_url
		});
	}

	req.body.productImages = productImageURL;

	// Update Model.
	updateProduct = await productModel.findByIdAndUpdate(
		req.params.id,
		req.body
	);

	res.status(200).json({ status: true });
});

// Delete a product in DB. -- ADMIN ONLY
exports.deleteProduct = asyncCatch(async (req, res, next) => {
	let deleteProduct = await productModel.findById(req.params.id);

	if (!deleteProduct) {
		return next(new ErrorHandler("Product Not Found", 404));
	}

	// Destroy the product image in cloudinary.
	for (let i = 0; i < deleteProduct.productImages.length; i++) {
		await cloudnary.v2.uploader.destroy(deleteProduct.productImages[i].imagePublicId);
	}

	deleteProduct = await productModel.findByIdAndRemove(req.params.id);
	res.status(200).json({ status: true });
});

// Getting particular product from DB by ID.
exports.getOneProduct = asyncCatch(async (req, res, next) => {
	const oneProduct = await productModel.findById(req.params.id);

	if (!oneProduct) {
		return next(new ErrorHandler("Product Not Found", 404));
	}

	res.status(200).json({ status: true, oneProduct });
});

// Extracting all the Products from the DB.
exports.getAllProducts = asyncCatch(async (req, res, next) => {

	// Add to count total products and pagination.
	const totalProducts = await productModel.countDocuments();
	const apiFeatureForSearchProductCount = new apiFeature(productModel.find(), req.query).search().filter();
	const apiFeatureObj = new apiFeature(productModel.find(), req.query)
		.search()
		.filter()
		.productPerPage(resultsPerPage);

	const allProducts = await apiFeatureObj.query;

	const searchProductsCount = await apiFeatureForSearchProductCount.query;
	const totalSearchProducts = searchProductsCount.length;

	let categories = await productModel.distinct("productCategory");

	res.status(200).json({
		status: "Successfully retrieved all products",
		products: allProducts,
		totalProducts: totalProducts,
		resultsPerPage: resultsPerPage,
		totalSearchProducts: totalSearchProducts,
		categories: categories
	});
});

// Get Random Products for the carousel.
exports.getRandomProductCarousel = asyncCatch(async (req, res, next) => {
	const randomProducts = await productModel.aggregate([
		{ $sample: { size: 6 } }
	]);

	res.status(200).json({ status: true, randomProducts: randomProducts });
});

// Get Top 8 Home Selling Products.
exports.getHomeHighestSellingProducts = asyncCatch(async (req, res, next) => {
	// Sort Products descending by number of times they are sold and limit to 8.
	const highestSellingProducts = await productModel.find({}).sort({ 'totalSell': -1 }).limit(8);

	res.status(200).json({ status: true, highestSellingProducts: highestSellingProducts });
});

// Admin Get all the products.
exports.getAllProductsAdmin = asyncCatch(async (req, res, next) => {
	const products = await productModel.find({});

	res.status(200).json({ status: true, products: products });
});

// Create or update a review of a product.
exports.updateOrCreateReview = asyncCatch(async (req, res, next) => {

	const userID = req.user.id;
	const userName = req.user.userFullName;

	const rating = Number(req.body.rating);
	const comment = req.body.comment;
	const productID = req.body.productID;

	const product = await productModel.findById(productID);

	let isReviewed = false;

	product.productReview.forEach(function (review) {
		if (review.reviewerName === userName) {
			isReviewed = true;
		}
	});

	if (isReviewed) {
		product.productReview.forEach(async (review) => {
			if (review.reviewerName === userName) {
				review.ratingOfTheProduct = rating;
				review.commentOnProduct = comment;
			}
		});

		product.productRating = updateOverallReview(product);
		await product.save({ validateBeforeSave: false });
		res.status(200).json({ status: true, message: "Review Updated successfully" });
	}
	else {
		product.productReview.push({ reviewerID: userID, reviewerName: userName, ratingOfTheProduct: rating, commentOnProduct: comment });

		product.productNumOfReviews = product.productReview.length;

		product.productRating = updateOverallReview(product);
		await product.save();
		res.status(200).json({ status: true, message: "Review Added successfully" });
	}
});

// Getting all the reviews of a product.
exports.getAllReviews = asyncCatch(async (req, res, next) => {

	const productID = req.query.id;

	const product = await productModel.findById(productID);

	if (!product) {
		return next(new ErrorHandler("Product Not Found", 404));
	};

	res.status(200).json({ status: true, reviews: product.productReview });
});

// Deleting specific review of a product.
exports.deleteReview = asyncCatch(async (req, res, next) => {

	const productID = req.query.productID;
	const product = await productModel.findById(productID);

	if (!product) {
		return next(new ErrorHandler("Product Not Found", 404));
	};

	let index = 0;

	for (let i = 0; i < product.productReview.length; i++) {
		if (req.query.id === product.productReview[i]._id) {
			index = i;
			break;
		}
	};

	product.productReview.splice(index, 1);

	product.productNumOfReviews = product.productReview.length;
	product.productRating = updateOverallReview(product);
	await product.save();

	res.status(200).json({ status: true });

});

// return an average rating of a product.
function updateOverallReview(product) {

	let avg = 0;
	let totalRating = 0;

	product.productReview.forEach((review) => {
		totalRating += review.ratingOfTheProduct;
	});

	if (product.productReview.length > 0) {
		avg = totalRating / product.productReview.length;
	}
	else {
		avg = 0;
	}
	
	return avg;
}