/*	
	Date: May 15, 2022
		* Created Home Component.
		* Created Carousel and Heading.

	Date: May 16, 2022
		* Add Loading and fetched products from backend.
*/

// Importing necessary modules for getting items from backend.
import React, { Fragment, useEffect } from 'react';
import { clearErrors, getProduct } from "../../Actions/productAction";
import { useSelector, useDispatch } from 'react-redux';
import './HomeStyles.css';

// Module for error PopUp.
import { toast } from 'react-toastify';

// Importing Components.
import CarouselHeader from '../Layout/Headers/CarouselHeader';
import Heading from '../Layout/Heading/Heading';
import ProductCard from "../Layout/ProductCard/ProductCard.js";
import MetaData from "../Layout/MetaData";

// Carousel Images.
import laptop from "../../Images/laptop.jpeg";
import shoes from "../../Images/shoes.jpeg";
import phone from "../../Images/phone.jpeg";
import ring from "../../Images/ring.jpeg";
import watch from "../../Images/watch.jpeg";
import airpods from "../../Images/airpods.jpeg";
import tv from "../../Images/tv.jpeg";
import Loading from '../Loading/Loading';

const carouselProducts = [laptop, shoes, phone, ring, watch, tv, airpods];

const Home = () => {

	// Getting Items from Store with useSelector.
	const dispatch = useDispatch();
	const { loading, error, products } = useSelector(
		(state) => state.products);

	// Give Items from backend to Store. Call the function in Actions.
	useEffect(() => {
		// Error PopUp
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors);
		}

		// getProduct() function in Actions.
		dispatch(getProduct());
	}, [dispatch, error]);

	return (
		<Fragment>
			{/* Loading if something wrong. */}
			{loading ? <Loading /> :
				<Fragment>

					{/* Give Page name */}
					<MetaData title={"E-Shop"} />

					{/* Carousel of the product */}
					<CarouselHeader products={carouselProducts} />

					{/* Heading */}
					<div style={{marginTop: "5%"}}></div>
					<Heading props={"Featured Products"} />

					{/* ProductCards */}
					<div className="product-container">

						{products && products.map(product => (
							<ProductCard product={product} />
						))}
					</div>
				</Fragment>
			}
		</Fragment>
	)
}

export default Home