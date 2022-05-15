import React from 'react';
import CarouselHeader from '../Headers/CarouselHeader';
import Heading from '../Heading/Heading';

import laptop from "../../../Images/laptop.jpeg";
import shoes from "../../../Images/shoes.jpeg";
import phone from "../../../Images/phone.jpeg";
import ring from "../../../Images/ring.jpeg";
import watch from "../../../Images/watch.jpeg";
import airpods from "../../../Images/airpods.jpeg";
import tv from "../../../Images/tv.jpeg";

const products = [laptop, shoes, phone, ring, watch, tv, airpods];

const home = () => {
	return (
		<div>
			<CarouselHeader products={products} />
			<Heading props={"Featured Products"} />
		</div>
	)
}

export default home