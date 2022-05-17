import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './headerCarousel.css';

const options = {
	infiniteLoop: true,
	autoPlay: true,
	interval: 1800,
	autoFocus: true,
	useKeyboardArrows: true,
	stopOnHover: true,
	transitionTime: 700
}

const CarouselHeader = ({ products }) => {
	return (

		<div className="header-carousel">
			<Carousel {...options}>
				{products.map((item, index) => (
					<img
						src={item}
						alt={index}
					/>
				))}

			</Carousel>
		</div>
	)
}

export default CarouselHeader