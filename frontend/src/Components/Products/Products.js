import React, { Fragment, useEffect } from 'react';
import { getProduct } from '../../Actions/productAction';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../Loading/Loading';

const Products = () => {

	const dispatch = useDispatch();

	const { loading, error, products, productsCount } = useSelector(
		(state) => state.products);

	useEffect(() => {
		dispatch(getProduct());
	}, [dispatch]);

	return (
		<Fragment>
			{loading ? < Loading /> : <Fragment>
				
				</Fragment>}
		</Fragment>
	)
}

export default Products