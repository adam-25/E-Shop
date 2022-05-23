/*	
	Date: May 17, 2022
		* Creating Component for Specific Product page.
*/


// Importing modules, Actions and items to get Data from Store and to Store Data to Store.
import React, { Fragment, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getSpecificProduct } from '../../Actions/productAction';

// Review and Error PopUp
import ReactStars from 'react-rating-stars-component';

// Importing Components and CSS.
import MetaData from '../Layout/MetaData';
import Loading from '../Loading/Loading';
import Heading from "../Layout/Heading/Heading";
import ReviewCard from './ReviewCard.js';
import './specificProductStyle.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

// Options for Carousel.
const optionsCarousel = {
	infiniteLoop: true,
	autoPlay: true,
	interval: 1800,
	autoFocus: true,
	useKeyboardArrows: true,
	stopOnHover: true,
	transitionTime: 700,
	showArrows: true
}

const SpecificProduct = ({ match }) => {

	const dispatch = useDispatch();
	let history = useHistory();

	const { isAuthenticateUser } = useSelector(state => state.user)
	const [quantity, setQuantity] = useState(0);

	// Getting Items from Store with useSelector.
	const { oneProduct, loading, error } = useSelector(state => state.oneProduct);


	// Give Items from backend to Store. Call the function in Actions.
	useEffect(() => {

		// Error PopUp
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		// Dispatch getSpecificProduct() function with ID in URL.
		// Getting ID in URL with match.params.id.
		dispatch(getSpecificProduct(match.params.id));

	}, [dispatch, match.params.id, error]);

	// Stars options.
	const optionsReview = {
		edit: false,
		color: "#0F1111",
		activeColor: "#FDCC0D",
		size: window.innerWidth < 992 ? 17 : 20,
		value: oneProduct.productRating,
		isHalf: true
	}

	function reduceQuantity() {
		if (quantity === 0) {
			setQuantity(quantity);
		}
		else {
			const temp = quantity - 1;
			setQuantity(temp);
		}
	}

	function addQuantity() {
		if (oneProduct.productStock <= quantity) {
			setQuantity(quantity);
		}
		else {
			const temp = quantity + 1;
			setQuantity(temp);
		}
	}

	return (
		<Fragment>
			{/* Loading */}
			{loading ? <Loading /> :
				<Fragment>
					{/* Setting name of the page to the productName */}
					<MetaData title={oneProduct.productName && oneProduct.productName} />
					{/* Image Carousel */}
					<div className="specific-product">
						<div>
							<Carousel {...optionsCarousel}>
								{oneProduct.productImages && oneProduct.productImages.map((item, index) => (
									<img
										className="product-carousel-image"
										src={item.imageURL}
										alt="Not Available"
										key={index}
									/>
								))}

							</Carousel>
						</div>
						{/* Product Details Div */}
						<div className="specific-product-details">
							{/* Name */}
							<div className="product-name">
								<h2>{oneProduct.productName}</h2>
								<p>Product # {oneProduct._id}</p>
							</div>
							{/* Review, Number of Review */}
							<div className="specific-product-reviews">
								<ReactStars {...optionsReview} />
								<span>
									{oneProduct.productNumOfReviews === 0 || 1 ?
										<span>( {oneProduct.productNumOfReviews} Review )</span>
										: <span>( {oneProduct.productNumOfReviews} Reviews )</span>}
								</span>
							</div>
							{/* Price and Quantity */}
							<div className="price-quantity">
								<h1>{"$" + oneProduct.productPrice}</h1>
								<div className="product-add-to-cart">
									{/* Div for Items Count */}
									<div className="specific-product-quantity">
										<button onClick={reduceQuantity}>-</button>
										<input type="number" value={quantity} readOnly />
										<button onClick={addQuantity}>+</button>
									</div>
									{/* Add to Cart Button */}

									<button disabled={oneProduct.productStock <= 0 || quantity <= 0} onClick={addToCartHandler}>Add to Cart</button>
								</div>

								{/* InStock or not with colors and text */}
								<p>
									Status: {" "}
									<b className={oneProduct.productStock < 1 ? "red-color" : "green-color"}>
										{oneProduct.productStock < 1 ? "Out of Stock" : "InStock"}
									</b>
								</p>
							</div>
							{/* Product Description */}
							<div className="specific-product-description">
								<p> Description: </p> <p>{oneProduct.productDescription}</p>
							</div>

							{/* Submit Review Button */}
							<button className="submit-specific-product-review">Submit Review</button>
						</div>
					</div>
				</Fragment>
			}

			{/* Heading */}
			<Heading props="Reviews" />

			{/* Margin */}
			<div style={{ marginTop: "62px" }}></div>

			{/* Product Reviews. */}
			{oneProduct.productReview && oneProduct.productReview[0] ? (

				<div className="product-all-review">
					{
						oneProduct.productReview && oneProduct.productReview.map((review) =>
							<ReviewCard review={review} />)
					}
				</div>
			) : <p className="product-no-review">No Review Yet</p>}

		</Fragment>
	)
}

export default SpecificProduct