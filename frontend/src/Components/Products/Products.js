/*
	Date: May 17, 2022
		* Page for every Products.

	Date: May 18, 2022
		* Add filters for every Products.
		* Add Pagination and Searching Products.
		* Add Price range.\
		* Add Dropdown menu.
*/

// Importing necessary modules for getting items from backend.
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// For Pagination
import Pagination from "react-js-pagination";

// Filters.
import Slider from '@material-ui/core/Slider';

// Importing Component.
import Loading from '../Loading/Loading';
import Heading from '../Layout/Heading/Heading';
import ProductCard from '../Layout/ProductCard/ProductCard';
import { clearErrors, getProduct } from '../../Actions/productAction';
import './Products.css';

// Module for error PopUp.
import { toast } from 'react-toastify';
import MetaData from '../Layout/MetaData';

const Products = ({ match }) => {

	// Getting Items from Store with useSelector.
	const dispatch = useDispatch();
	const { isAuthenticateUser } = useSelector(state => state.user);
	const { loading, error, products, resultsPerPage, totalSearchProducts, categories } = useSelector((state) => state.products);

	// Setting current Page useState.
	const [currentPage, setCurrentPage] = useState(1);
	// Set Price range.
	const [price, setPrice] = useState([0, 10000]);

	// Set Category/
	const [category, setCategory] = useState("");

	// Set which type of sort user has clicked.
	const [sort, setSort] = useState("");

	// Set Current page by pagination.
	const setCurrentPageNo = (event) => {
		setCurrentPage(event);
	}

	// Set the price.
	const priceChangeHandler = (event, newPrice) => {
		setPrice(newPrice);
	}

	const searchWords = match.params.searchWords;

	useEffect(() => {
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		// Passing Parameters to getProduct with particular criteria.
		dispatch(getProduct(searchWords, currentPage, price, category, sort));
	}, [dispatch, searchWords, error, currentPage, price, category, sort]);

	return (
		<Fragment>
			{loading ? <Loading /> : <Fragment>
				{/* See Product is found or not. */}
				{products.length === 0 ? <Fragment>
					{!isAuthenticateUser && <div className="space"></div>}
					<div>
						<div className="products-heading-title">
							{/* Set Headers if products is not found. */}
							<Heading props="No Results..." />
						</div>
						<MetaData title="No Results..." />
					</div>
				</Fragment> :

					// All Products. Nothing is Searched
					<Fragment>
						<div className="drop-down">
							<div className="dropdown">
								{/* Sort Options Dropdown menu. */}
								<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Sort Products... <span>   </span>
								</button>
								<div className="dropdown-menu">
									{/* Dropdown menu items. */}
									<li className="dropdown-item" onClick={() => setSort("lowHigh")}>Low to High Price</li>
									<li className="dropdown-item" onClick={() => setSort("highLow")}>High to Low Price</li>
									<li className="dropdown-item" onClick={() => setSort("ratingSort")}>By Ratings</li>
								</div>
							</div>
						</div>
						{/* If there is no search by the user. */}
						{!searchWords ? <Fragment>

							{/* If user is not logged in adjust space. */}
							{!isAuthenticateUser && <div className="space"></div>}

							{/* If there is no category. */}
							{!category ? <Fragment>
								<div className="products-heading-title">
									{/* Set Header. */}
									<Heading props="All Products" />
								</div>
								<MetaData title="All Products" />
							</Fragment>
								:

								// Particular category products.
								<Fragment>
									<div className="products-heading-title">
										{/* Set Header with product category name. */}
										<Heading props={category} />
									</div>
									<MetaData title={category + " category"} />
								</Fragment>}
							<div className="space-below-heading"></div>

							{/* Search all products card. */}
							<div className="product-container all-products">
								{products && products.map(product => (
									<ProductCard product={product} />
								))}
							</div>

							{/* Filter options. */}
							<div className="filters">
								<h5>Price</h5>
								{/* Slider for Price. */}
								<Slider
									value={price}
									onChange={priceChangeHandler}
									valueLabelDisplay="auto"
									aria-labelledby="continuos-slider"
									min={0}
									max={10000}
								/>
								<h5>Category</h5>
								{/* Category names list. */}
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
							{/* Pagination box. */}
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
							// Return Searched Products with title.
							<Fragment>
								{!isAuthenticateUser && <div className="space"></div>}
								<div className="products-heading-title">
									<Heading props={"Results for \"" + searchWords.charAt(0).toUpperCase() + searchWords.slice(1) + "\" Search"} />
								</div>
								<MetaData title={"\"" + searchWords.charAt(0).toUpperCase() + searchWords.slice(1) + "\" Search..."} />
								<div className="space-below-heading"></div>

								{/* Show all searched products card. */}
								<div className="product-container all-products">
									{products && products.map(product => (
										<ProductCard product={product} />
									))}
								</div>

								{/* Filters. */}
								<div className="filters">
									<h5>Price</h5>
									{/* Price Slider. */}
									<Slider
										value={price}
										onChange={priceChangeHandler}
										valueLabelDisplay="auto"
										ariaLabelledby="slider"
										min={0}
										max={10000}
									/>
									<h5>Category</h5>

									{/* All Category list. */}
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

								{/* Pagination box. */}
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