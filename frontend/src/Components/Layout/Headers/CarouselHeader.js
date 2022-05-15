import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../../Styles/headerCarousel.css';

const CarouselHeader = ({ products }) => {
	return (

		<Carousel className="header-carousel" 
		infiniteLoop 
		autoPlay 
		interval={3000} 
		autoFocus 
		useKeyboardArrows 
		transitionTime={800}>
			{products.map((item, index) => (
				<img
					src={item}
					alt={index}
				/>
			))}

		</Carousel>
	)
}

export default CarouselHeader