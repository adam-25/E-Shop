/*	
	Date: May 17, 2022
		* Creating Component for Specific Product page.
	
	Date: May 21, 2022
		* Added function which will be able to change the quantity of items.

	Date: May 23, 2022
		* Add Item to the Cart of user.
*/


// Importing modules, Actions and items to get Data from Store and to Store Data to Store.
import React, { Fragment, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

// For Submit Review PopUp.
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Review and Error PopUp
import ReactStars from 'react-rating-stars-component';

// Importing Components and CSS.
import MetaData from '../Layout/MetaData';
import Loading from '../Loading/Loading';
import Heading from "../Layout/Heading/Heading";
import ReviewCard from './ReviewCard.js';
import { addToCart } from '../../Actions/cartActions';
import { addOrCreateReview, clearErrors, getSpecificProduct } from '../../Actions/productAction';
import './specificProductStyle.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Rating } from '@mui/material';

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

	const [quantity, setQuantity] = useState(0);

	// Review PopUp.
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	// Rating and Comment which is set when popup opens.
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState();

	// When submit review button clicked popup opens.
	const handleClickOpen = () => {
		setOpen(true);
	};

	// When popup closed.
	const handleClose = () => {
		setOpen(false);
	};

	// Getting Items from Store with useSelector.
	const { oneProduct, loadingOneProduct, error } = useSelector(state => state.oneProduct);
	const { isAuthenticateUser, loading } = useSelector(state => state.user);
	const { reviewError } = useSelector(state => state.addReview);

	// Adds Item to the Cart of user.
	const addToCartHandle = () => {

		if (!loading) {
			if (isAuthenticateUser === false) {
				history.push('/login');
			}
		}

		if (!loading) {
			if (isAuthenticateUser === true) {
				dispatch(addToCart(match.params.id, quantity));
				toast("Item Added To Cart")
			}
		}
	}

	// Stars options.
	const optionsReview = {
		edit: false,
		color: "#d0d0d0",
		activeColor: "#FDCC0D",
		size: window.innerWidth < 992 ? 17 : 20,
		value: oneProduct.productRating,
		isHalf: true
	}

	// Reduce the quantity.
	function reduceQuantity() {
		if (quantity === 0) {
			setQuantity(quantity);
		}
		else {
			const temp = quantity - 1;
			setQuantity(temp);
		}
	}

	// Increase the quantity.
	function addQuantity() {
		if (oneProduct.productStock <= quantity) {
			setQuantity(quantity);
		}
		else {
			const temp = quantity + 1;
			setQuantity(temp);
		}
	}


	// Give Items from backend to Store. Call the function in Actions.
	useEffect(() => {

		// Error PopUp
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		if (reviewError) {
			toast("Error: " + reviewError);
			dispatch(clearErrors());
		}

		// Dispatch getSpecificProduct() function with ID in URL.
		// Getting ID in URL with match.params.id.
		dispatch(getSpecificProduct(match.params.id));

	}, [dispatch, match.params.id, error, loading, isAuthenticateUser, oneProduct, reviewError]);

	// When user click submit on review popup.
	const submitReview = () => {
		// Product ID
		const productID = match.params.id;

		// If User rating is 0, then let them know 0 is not possible.
		if (rating === 0) {
			toast("Rating cannot be zero...");
			setOpen(false);
			return;
		}

		// Otherwise, dispatch an action...
		dispatch(addOrCreateReview(rating, comment, productID));
		setOpen(false);

		// Reload the page.
		window.location.reload();
	}

	return (
		<Fragment>
			{/* Loading */}
			{loadingOneProduct ? <Loading /> :
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

									<button disabled={oneProduct.productStock <= 0 || quantity <= 0} onClick={addToCartHandle}>Add to Cart</button>
								</div>

								{/* InStock or not with colors and text */}
								<p>
									Status:
									<b className={oneProduct.productStock < 1 ? "red-color" : "green-color"}>
										{oneProduct.productStock < 1 ? " Out of Stock" : " InStock"}
									</b>
								</p>
							</div>
							{/* Product Description */}
							<div className="specific-product-description">
								<p> Description: </p> <p>{oneProduct.productDescription}</p>
							</div>

							{/* Submit Review Button */}
							<button className="submit-specific-product-review" onClick={handleClickOpen}>Submit Review</button>
						</div>
					</div>
				</Fragment>
			}

			{/* Heading */}
			<Heading props="Reviews" />

			{/* Review popup */}
			<div className='popup-review'>
				{/* When Dialog box opens when close. */}
				<Dialog
					fullScreen={fullScreen}
					open={open}
					onClose={handleClose}
					aria-labelledby="responsive-dialog-title"
				>
					{/* Title of the popup */}
					<DialogTitle id="responsive-dialog-title" style={{ fontFamily: "Comic Neue, cursive", fontSize: "3vmax" }} >
						{oneProduct.productName + " Review Submit"}
					</DialogTitle>
					<DialogContent>
						{/* rating to set */}
						<div>
							<Rating
								onChange={(e) => setRating(e.target.value)}
								value={rating}
								color="#0F1111"
								activeColor="#FDCC0D"
								size="large"
							/>
						</div>
						{/* TextArea where comment is written */}
						<div className='text-area-and-button'>
							<div>
								<textarea className='comment-area' cols={50} rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
							</div>
							<div>
								{/* Submit Button. */}
								<button id="review-popup-button" onClick={submitReview}>
									Submit
								</button>
								{/* Cancel Button */}
								<button id="review-popup-button" onClick={handleClose}>
									Cancel
								</button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

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