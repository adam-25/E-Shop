import React from 'react';
import CarouselHeader from '../Headers/CarouselHeader';
import Heading from '../Heading/Heading';
import Product from "../Product/Product.js";

import laptop from "../../../Images/laptop.jpeg";
import shoes from "../../../Images/shoes.jpeg";
import phone from "../../../Images/phone.jpeg";
import ring from "../../../Images/ring.jpeg";
import watch from "../../../Images/watch.jpeg";
import airpods from "../../../Images/airpods.jpeg";
import tv from "../../../Images/tv.jpeg";

const featureProduct = {
	name: "hat",
	price: "20.00",
	image: [{url: "https://image.shutterstock.com/image-photo/bamboo-hat-white-background-260nw-766363204.jpg"}],
	_id: "adarsh"
}

const products = [laptop, shoes, phone, ring, watch, tv, airpods];

const home = () => {
	return (
		<div>
			<CarouselHeader products={products} />
			<Heading props={"Featured Products"} />
			<div className="product-container" id='product-container'>
				<Product featureProduct={featureProduct}/>
			</div>
		</div>
	)
}

export default home