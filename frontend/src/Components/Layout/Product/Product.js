import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import '../../../Styles/HomeStyle/homeStyle.css';

const options = {
	edit: false,
	color: "#0F1111",
	activeColor: "#ffd700",
	size: window.innerWidth < 900 ? 18 : 20,
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
					<ReactStars {...options} /> <span>(256 Review)</span>
				</div>
				<span>{"$" + featureProduct.price}</span>
			</Link>
		</div>
	)
}

export default Product