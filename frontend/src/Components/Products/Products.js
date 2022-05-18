/*
	Date: May 17, 2022
		* Page for every Products.
*/

// Importing necessary modules for getting items from backend.
import React, { Fragment, useEffect, useState } from 'react';
import { clearErrors, getProduct } from '../../Actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from "react-js-pagination";

// Importing Component.
import Loading from '../Loading/Loading';
import Heading from '../Layout/Heading/Heading';
import ProductCard from '../Layout/ProductCard/ProductCard';
import './paginationStyle.css';

// Module for error PopUp.
import { toast } from 'react-toastify';

const Products = ({ match }) => {

	// Setting current Page useState.
	const [currentPage, setCurrentPage] = useState(1);

	const setCurrentPageNo = (event) => {
		setCurrentPage(event);
	}

	// Getting Items from Store with useSelector.
	const dispatch = useDispatch();
	const { loading, error, products, productsCount, resultsPerPage, totalSearchProducts } = useSelector(
		(state) => state.products);

	const searchWords = match.params.searchWords;

	useEffect(() => {
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors);
		}

		dispatch(getProduct(searchWords, currentPage));
	}, [dispatch, searchWords, error, currentPage]);

	return (
		<Fragment>
			{loading ? <Loading /> : <Fragment>
				{/* See Product is found or not. */}
				{products.length === 0 ? <Fragment>
					<div className="space"></div>
					<div>
						<Heading props="No Results..." />
					</div>
				</Fragment> : 
				// All Products. Nothing is Searched
				<Fragment>{!searchWords ? <Fragment>
					<div className="space"></div>
					<Heading props="All Products" />
					<div style={{ marginTop: "3%" }}></div>

					<div className="product-container">
						{products && products.map(product => (
							<ProductCard product={product} />
						))}
					</div>
					<div className="paginationBox">
						<Pagination
							activePage={currentPage}
							itemsCountPerPage={resultsPerPage}
							totalItemsCount={productsCount}
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
					<Heading props={"Results for \"" + searchWords.charAt(0).toUpperCase() + searchWords.slice(1) + "\" Search"} />
					<div style={{ marginTop: "3%" }}></div>
					{console.log(productsCount)}

					<div className="product-container">
						{products && products.map(product => (
							<ProductCard product={product} />
						))}
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