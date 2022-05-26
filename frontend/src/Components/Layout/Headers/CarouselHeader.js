/*
	Date: May 15, 2022
		* Add Carousel Header.
*/

// Importing CSS and Carousel.
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
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
				{products.map((item, index) => (
					<img
						key={index}
						src={item}
						alt={index}
					/>
				))}

			</Carousel>
		</div>
	)
}

export default CarouselHeader