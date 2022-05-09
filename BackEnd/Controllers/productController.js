/*
	Date: May 8, 2022
		* Controls the operation on Products.
		* Get All Products, Create a new Product.
*/

// Importing necessary files.
const productModel = require("../Models/productModel")

// Creating a new Product in DB. -- ADMIN ONLY
exports.createProduct = (req, res, next) => {

	const newProduct = productModel.create(req.body);

	res.status(200).json({ status: "Success", createdProduct: newProduct });
};

// Update a Product in DB. -- ADMIN ONLY
exports.updateProduct = async (req, res, next) => {

	let updateProduct = await productModel.findById(req.params.id);

	if (!updateProduct) {
		return res.status(404).json({ status: "False", message: "Product not found" });
	}
	else {
		updateProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
			useFindAndModify: false
		})
		res.status(200).json({ status: "Updated Successfully" });
	};
}

// Delete a product in DB. -- ADMIN ONLY
exports.deleteProduct = async (req, res) => {
	let deleteProduct = await productModel.findById(req.params.id);

	if (!deleteProduct) {
		return res.status(404).json({ status: "False", message: "Product not found" });
	}
	else {
		deleteProduct = await productModel.findByIdAndRemove(req.params.id);
		res.status(200).json({ status: "Deleted Successfully" });
	}
};

exports.getOneProduct = async (req, res) => {
	
	const oneProduct = await productModel.findById(req.params.id);

	if (!oneProduct)	{
		return res.status(404).json({ status: "False", message: "Product not found" });
	}
	else {
		res.status(200).json({ status: "True", message: oneProduct});
	}
};

// Extracting all the Products from the DB.
exports.getAllProducts = async (req, res, next) => {

	const allProducts = await productModel.find();

	res.status(200).json({ status: "Successfully retrieved all products", products: allProducts });
};