/*
	Date: May 17, 2022
		* Page for every Products.

	Date: May 18, 2022
		* Add filters for every Products.
*/

// Importing necessary modules for getting items from backend.
import React, { Fragment, useEffect, useState } from 'react';
import { clearErrors, getProduct } from '../../Actions/productAction';
import { useSelector, useDispatch } from 'react-redux';

// For Pagination
import Pagination from "react-js-pagination";

// Filters.
import Slider from '@material-ui/core/Slider';

// Importing Component.
import Loading from '../Loading/Loading';
import Heading from '../Layout/Heading/Heading';
import ProductCard from '../Layout/ProductCard/ProductCard';
import './paginationStyle.css';

// Module for error PopUp.
import { toast } from 'react-toastify';
import MetaData from '../Layout/MetaData';

const Products = ({ match }) => {

	// Setting current Page useState.
	const [currentPage, setCurrentPage] = useState(1);
	const [price, setPrice] = useState([0, 10000]);
	const [category, setCategory] = useState("");
	const [sort, setSort] = useState("");

	const setCurrentPageNo = (event) => {
		setCurrentPage(event);
	}

	const priceChangeHandler = (event, newPrice) => {
		setPrice(newPrice);
	}

	// Getting Items from Store with useSelector.
	const dispatch = useDispatch();
	const { loading, error, products, resultsPerPage, totalSearchProducts, categories } = useSelector(
		(state) => state.products);

	const searchWords = match.params.searchWords;

	useEffect(() => {
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors);
		}

		dispatch(getProduct(searchWords, currentPage, price, category, sort));
	}, [dispatch, searchWords, error, currentPage, price, category, sort]);

	return (
		<Fragment>
			{loading ? <Loading /> : <Fragment>
				{/* See Product is found or not. */}
				{products.length === 0 ? <Fragment>
					<div className="space"></div>
					<div>
						<div className="products-heading-title">
							<Heading props="No Results..." />
						</div>
						<MetaData title="No Results..." />
					</div>
				</Fragment> :

					// All Products. Nothing is Searched
					<Fragment>
						<div className="drop-down">
							<div className="dropdown">
								<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Sort Products... <span>   </span>
								</button>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<li className="dropdown-item" onClick={() => setSort("lowHigh")}>Low to High Price</li>
									<li className="dropdown-item" onClick={() => setSort("highLow")}>High to Low Price</li>
									<li className="dropdown-item" onClick={() => setSort("ratingSort")}>By Ratings</li>
								</div>
							</div>
						</div>{!searchWords ? <Fragment>
							<div className="space"></div>

							{!category ? <Fragment>
								<div className="products-heading-title">
									<Heading props="All Products" />
								</div>
								<MetaData title="All Products" />
							</Fragment>
								: <Fragment>
									<div className="products-heading-title">
										<Heading props={category} />
									</div>
									<MetaData title={category + " category"} />
								</Fragment>}
							<div className="space-below-heading"></div>

							<div className="product-container all-products">
								{products && products.map(product => (
									<ProductCard product={product} />
								))}
							</div>
							<div className="filters">
								<h5>Price</h5>
								<Slider
									value={price}
									onChange={priceChangeHandler}
									valueLabelDisplay="auto"
									aria-labelledby="continuos-slider"
									min={0}
									max={10000}
								/>
								<h5>Category</h5>
								<ul className="category">
									{categories && categories.map(category => (
										<li
											onClick={() => setCategory(category)}
										>
											{category}
										</li>
									))}
								</ul>
							</div>
							<div className="paginationBox">
								<Pagination
									activePage={currentPage}
									itemsCountPerPage={resultsPerPage}
									totalItemsCount={totalSearchProducts}
									onChange={setCurrentPageNo}
									nextPageText="Next"
									prevPageText="Prev"
									firstPageText="<<"
									lastPageText=">>"
									itemClass='page-item'
									linkClass='page-link'
									activeClass='pageItemActive'
									activeLinkClass='pageLinkActive'
								/>
							</div>
						</Fragment> :
							// Return Searched Products.
							<Fragment>
								<div className="space" ></div>
								<div className="products-heading-title">
									<Heading props={"Results for \"" + searchWords.charAt(0).toUpperCase() + searchWords.slice(1) + "\" Search"} />
								</div>
								<MetaData title={"\"" + searchWords.charAt(0).toUpperCase() + searchWords.slice(1) + "\" Search..."} />
								<div className="space-below-heading"></div>

								<div className="product-container all-products">
									{products && products.map(product => (
										<ProductCard product={product} />
									))}
								</div>

								<div className="filters">
									<h5>Price</h5>
									{(function () {
										("#slider-range").slider({
											range: true,
											min: 0,
											max: 500,
											values: [75, 300],
											slide: function (event, ui) {
												("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
											}
										});
										("#amount").val("$" + ("#slider-range").slider("values", 0) +
											" - $" + ("#slider-range").slider("values", 1));
									})}
									<Slider
										value={price}
										onChange={priceChangeHandler}
										valueLabelDisplay="auto"
										ariaLabelledby="slider"
										min={0}
										max={10000}
									/>
									<h5>Category</h5>
									<ul className="category">
										{categories && categories.map(category => (
											<li
												onClick={() => setCategory(category)}
											>
												{category}
											</li>
										))}
									</ul>
								</div>

								<div className="paginationBox">
									<Pagination
										activePage={currentPage}
										itemsCountPerPage={resultsPerPage}
										totalItemsCount={totalSearchProducts}
										onChange={setCurrentPageNo}
										nextPageText="Next"
										prevPageText="Prev"
										firstPageText="<<"
										lastPageText=">>"
										itemClass='page-item'
										linkClass='page-link'
										activeClass='pageItemActive'
										activeLinkClass='pageLinkActive'
									/>
								</div>
							</Fragment>}
					</Fragment>}
			</Fragment>}
		</Fragment>
	)
}

export default Products