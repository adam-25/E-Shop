import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import './productStyle.css';

const options = {
	edit: false,
	color: "#0F1111",
	activeColor: "#FDCC0D",
	size: window.innerWidth < 900 ? 13 : 20,
	value: 4,
	isHalf: true
}

const Product = ({ featureProduct }) => {
	return (
		<div>
			<Link className="productCard" to={featureProduct._id}>
				<img src={featureProduct.image[0].url} alt={featureProduct.name} />
				<p>{featureProduct.name}</p>
				<div>
					<ReactStars {...options} /> <span className="reviews">(256)</span>
				</div>
				<span>{"$" + featureProduct.price}</span>
			</Link>
		</div>
	)
}

export default Product