import React from 'react';
import PreHeader from './PreHeader';
import CarouselHeader from './CarouselHeader.js';
import laptop from "../../../Images/laptop.jpeg";
import shoes from "../../../Images/shoes.jpeg";
import phone from "../../../Images/phone.jpeg";
import ring from "../../../Images/ring.jpeg";
import watch from "../../../Images/watch.jpeg";
import airpods from "../../../Images/airpods.jpeg";

const products = [laptop, shoes, phone, ring, watch, airpods];

const Header = () => {
	return (
		<div>
			<PreHeader />
			<CarouselHeader products={products} interval={2}/>
		</div>
	)
}

export default Header;