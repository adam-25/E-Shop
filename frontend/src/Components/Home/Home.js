import React from 'react';
import CarouselHeader from '../Layout/Headers/CarouselHeader';
import Heading from '../Layout/Heading/Heading';
import Product from "../Layout/Product/Product.js";

import laptop from "../../Images/laptop.jpeg";
import shoes from "../../Images/shoes.jpeg";
import phone from "../../Images/phone.jpeg";
import ring from "../../Images/ring.jpeg";
import watch from "../../Images/watch.jpeg";
import airpods from "../../Images/airpods.jpeg";
import tv from "../../Images/tv.jpeg";

const featureProduct = {
	name: "Blue T-Shirt for Men",
	price: "20.00",
	image: [{url: "https://www.themodestman.com/wp-content/uploads/2020/03/Ash-and-Erie-v-neck-t-shirt.jpg"}],
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
				<Product featureProduct={featureProduct}/>
				<Product featureProduct={featureProduct}/>
				<Product featureProduct={featureProduct}/>
				<Product featureProduct={featureProduct}/>
				<Product featureProduct={featureProduct}/>
				<Product featureProduct={featureProduct}/>
				<Product featureProduct={featureProduct}/>
			</div>
		</div>
	)
}

export default home