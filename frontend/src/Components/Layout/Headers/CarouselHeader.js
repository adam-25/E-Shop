/*
	Date: May 15, 2022
		* Add Carousel Header.

	Date: June 1, 2022
		* Carousel Images of Products.
		* Update Carousel Images to become Link.
*/

// Importing CSS and Carousel.
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './headerCarousel.css';

// Options for Carousel.
const options = {
	infiniteLoop: true,
	autoPlay: true,
	interval: 1800,
	autoFocus: true,
	useKeyboardArrows: true,
	stopOnHover: true,
	transitionTime: 700,
	showStatus: false,
	showIndicators: false,
	showThumbs: false
}

const CarouselHeader = ({ products }) => {
	return (

		<div className="header-carousel">
			{/* Carousel Header  */}
			<Carousel {...options}>
				{products.map((product) => (
					<Link to={"/product/" + product._id}>
						<div>
							<img
								key={product._id}
								src={product.productImages[0].imageURL}
								alt={product.productName}
							></img>
						</div>
					</Link>
				))}

			</Carousel>
		</div>
	)
}

export default CarouselHeader