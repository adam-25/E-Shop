import React, { Fragment, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './specificProductStyle.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getSpecificProduct } from '../../Actions/productAction';
import Heading from "../Layout/Heading/Heading";
import ReviewCard from './ReviewCard.js';


import ReactStars from 'react-rating-stars-component';
import { toast } from 'react-toastify';
import MetaData from '../Layout/MetaData';
import Loading from '../Loading/Loading';


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

	const { oneProduct, loading, error } = useSelector(state => state.oneProduct)

	useEffect(() => {

		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors);
		}
		dispatch(getSpecificProduct(match.params.id));

	}, [dispatch, match.params.id, error, alert]);

	const optionsReview = {
		edit: false,
		color: "#0F1111",
		activeColor: "#FDCC0D",
		size: window.innerWidth < 992 ? 17 : 20,
		value: oneProduct.productRating,
		isHalf: true
	}

	return (
		<Fragment>
			{loading ? <Loading /> :
				<Fragment>
					<MetaData title={oneProduct.productName && oneProduct.productName} />
					<div className="specific-product">
						<div>
							<Carousel {...optionsCarousel}>
								{oneProduct.productImages && oneProduct.productImages.map((item, index) => (
									<img
										className="product-carousel-image"
										src={item.imageURL}
										alt="Image is not Available"
									/>
								))}

							</Carousel>
						</div>
						<div className="specific-product-details">
							<div className="product-name">
								<h2>{oneProduct.productName}</h2>
								<p>Product # {oneProduct._id}</p>
							</div>
							<div className="specific-product-reviews">
								<ReactStars {...optionsReview} />
								<span>
									{oneProduct.productNumOfReviews === 0 || 1 ?
										<span>( {oneProduct.productNumOfReviews} Review )</span>
										: <span>( {oneProduct.productNumOfReviews} Reviews )</span>}
								</span>
							</div>
							<div className="price-quantity">
								<h1>{"$" + oneProduct.productPrice}</h1>
								<div className="product-add-to-cart">
									<div className="specific-product-quantity">
										<button>-</button>
										<input type="number" value={1} />
										<button>+</button>
									</div>
									<button>Add to Cart</button>
								</div>

								<p>
									Status: {" "}
									<b className={oneProduct.productStock < 1 ? "red-color" : "green-color"}>
										{oneProduct.productStock < 1 ? "Out of Stock" : "InStock"}
									</b>
								</p>
							</div>
							<div className="specific-product-description">
								<p> Description: </p> <p>{oneProduct.productDescription}</p>
							</div>
							<button className="submit-specific-product-review">Submit Review</button>
						</div>
					</div>
				</Fragment>
			}

			<Heading props="Reviews" />

			<div style={{marginTop: "62px"}}></div>

			{oneProduct.productReview && oneProduct.productReview[0] ? (

				<div className="product-all-review">
					{
						oneProduct.productReview && oneProduct.productReview.map( (review) => 
						<ReviewCard review={review} /> )
					}
				</div>
			) : <p className="product-no-review">No Review Yet</p>}

		</Fragment>
	)
}

export default SpecificProduct