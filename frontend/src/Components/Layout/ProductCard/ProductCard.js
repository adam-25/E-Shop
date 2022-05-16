import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import './productStyle.css';

const Product = ({ product }) => {

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
				<img src={product.productImages[0].imageURL} alt={`${product.productName} Image`} />
				<p>{product.productName}</p>
				<div>
					<ReactStars {...options} />
					<span className="reviews">
						{product.productNumOfReviews === 0 || 1 ? 
						<span>( {product.productNumOfReviews} Review )</span> 
						: <span>( {product.productNumOfReviews} Reviews )</span>}
					</span>
				</div>
				<span>{"$" + product.productPrice}</span>
			</Link>
		</div>
	)
}

export default Product