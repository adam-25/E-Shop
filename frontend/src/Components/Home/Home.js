import React, { Fragment, useEffect } from 'react';
import CarouselHeader from '../Layout/Headers/CarouselHeader';
import Heading from '../Layout/Heading/Heading';
import ProductCard from "../Layout/Product/ProductCard.js";
import MetaData from "../Layout/MetaData";
import { getProduct } from "../../Actions/productAction";
import { useSelector, useDispatch } from 'react-redux';

import laptop from "../../Images/laptop.jpeg";
import shoes from "../../Images/shoes.jpeg";
import phone from "../../Images/phone.jpeg";
import ring from "../../Images/ring.jpeg";
import watch from "../../Images/watch.jpeg";
import airpods from "../../Images/airpods.jpeg";
import tv from "../../Images/tv.jpeg";
import Loading from '../Layout/Loading/Loading';

import { toast } from 'react-toastify';

const carouselProducts = [laptop, shoes, phone, ring, watch, tv, airpods];

const Home = () => {

	const dispatch = useDispatch();
	const { loading, error, products, productsCount } = useSelector(
		(state) => state.products);

	useEffect(() => {
		if (error) {
			return toast("Error: " + error);
		}
		dispatch(getProduct());
	}, [dispatch, error]);

	return (
		<Fragment>
			{loading ? <Loading /> :
				<Fragment>

					<MetaData title={"E-Shop"} />

					<CarouselHeader products={carouselProducts} />
					<Heading props={"Featured Products"} />
					<div className="product-container" id='product-container'>

						{products && products.map(product => (
							<ProductCard product={product} />
						))}
					</div>
				</Fragment>
			}
		</Fragment>
	)
}

export default Home