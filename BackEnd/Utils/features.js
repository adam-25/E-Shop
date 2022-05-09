/*
	Date: May 8, 2022
		* Different features that can be performed on products.
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

	// filter() {
		
	// }
};

module.exports = Features;