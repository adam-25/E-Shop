/*	
	Date: May 15, 2022
		* Created ProductCard Component.
		* Created a Card for any Product.
*/

// Importing CSS and Link so we don't have to use anchor tags.'
import React from 'react';
import { Link } from 'react-router-dom';
import './productStyle.css';

// ReactStarts for Review star of the product.
import ReactStars from 'react-rating-stars-component';

const ProductCard = ({ product }) => {

	// Options for review.
	const options = {
		edit: false,
		color: "#0F1111",
		activeColor: "#FDCC0D",
		size: window.innerWidth < 900 ? 13 : 20,
		value: product.productRating,
		isHalf: true
	}

	return (
		<div>
			<Link className="productCard" to={"/product/" + product._id}>
				{/* Product image and Name */}
				<img src={product.productImages[0].imageURL} alt={`${product.productName}`} />
				<p>{product.productName}</p>

				{/* Product Review. */}
				<div>
					<ReactStars {...options} />
					<span className="reviews">
						{product.productNumOfReviews === 0 || 1 ? 
						<span>( {product.productNumOfReviews} Review )</span> 
						: <span>( {product.productNumOfReviews} Reviews )</span>}
					</span>
				</div>
				{/* Price */}
				<span>{"$" + product.productPrice}</span>
			</Link>
		</div>
	)
}

export default ProductCard;