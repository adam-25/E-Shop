/*
	Date: May 8, 2022
		* Different features that can be performed when getting all the products.
*/

// Creating class with with params query and it's string.
class Features {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	// Search the product from the database according to the query.
	search() {
		const keyword = this.queryStr.keyword ? {
			productName: {
				$regex: this.queryStr.keyword,
				$options: "i"
			}
		} : {}

		this.query = this.query.find({...keyword});
		return this;
	}

	filter() {
		const queryCopy = {...this.queryStr};

		let newObj = {};

		newObj["productCategory"] = queryCopy.productCategory;
		newObj["productPrice"] = queryCopy.productPrice;

		// Filter a product by Price.
		let strObj = JSON.stringify(newObj);
		strObj = strObj.replace(/\b(gt|lt|gte|lte)\b/g, (value) => "$" + value);

		newObj = JSON.parse(strObj);

		this.query = this.query.find(newObj);
		return this;
	}

	// Get Product with a particular limit on a page.
	productPerPage(productPerPage) {
		const currentPage = Number(this.queryStr.page) || 1;

		const skipProducts = (currentPage - 1) * productPerPage;

		this.query = this.query.limit(productPerPage).skip(skipProducts);

		return this;
	}
};

module.exports = Features;