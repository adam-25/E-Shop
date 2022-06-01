/*	
	Date: May 15, 2022
		* Created Home Component.
		* Created Carousel and Heading.

	Date: May 16, 2022
		* Add Loading and fetched products from backend.

	Date: May 20, 2022
		* Add User options to home page when it logged in.

	Date: June 1, 2022
		* Add Carousel products which are random.
		* Add Featured products which are top selling products.
*/

// Importing necessary modules for getting items from backend.
import React, { Fragment, useEffect } from 'react';
import { clearErrors, getHighestSellingProducts, getProduct, getRandomProduct } from "../../Actions/productAction";
import { useSelector, useDispatch } from 'react-redux';
import './HomeStyles.css';

// Module for error PopUp.
import { toast } from 'react-toastify';

// Importing Components.
import CarouselHeader from '../Layout/Headers/CarouselHeader';
import Heading from '../Layout/Heading/Heading';
import ProductCard from "../Layout/ProductCard/ProductCard.js";
import MetaData from "../Layout/MetaData";
import UserOptions from "../Layout/UserOptions/UserOptions";
import Loading from '../Loading/Loading';

const Home = () => {

	// Getting Items from Store with useSelector.
	const dispatch = useDispatch();
	const { isAuthenticateUser } = useSelector(state => state.user);

	const { loading, error } = useSelector((state) => state.products);
	const { randomProducts, loadingCarouselProduct } = useSelector((state) => state.carouselProducts);
	const { loadingHomeProduct, highestSellingProducts } = useSelector((state) => state.homeProducts);

	// Give Items from backend to Store. Call the function in Actions.
	useEffect(() => {
		// Error PopUp
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		// getProduct() function in Actions.
		dispatch(getProduct());
		dispatch(getRandomProduct());
		dispatch(getHighestSellingProducts());
	}, [dispatch, error]);

	return (
		<Fragment>
			{/* Loading if something wrong. */}
			{loading || loadingCarouselProduct || loadingHomeProduct ? <Loading /> :
				<Fragment>

					{/* Give Page name */}
					<MetaData title={"E-Shop"} />

					{/* Carousel of the product */}
					<CarouselHeader products={randomProducts} />

					{isAuthenticateUser && <UserOptions />}

					{/* Heading */}
					<div style={{ marginTop: "3%" }}></div>
					<Heading props={"Featured Products"} />

					{/* ProductCards */}
					<div className="product-container">

						{highestSellingProducts && highestSellingProducts.map(product => (
							<ProductCard product={product} />
						))}
					</div>
				</Fragment>
			}
		</Fragment>
	)
}

export default Home