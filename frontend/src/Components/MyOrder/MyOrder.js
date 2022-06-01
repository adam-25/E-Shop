/*
	Date: May 29, 2022
		* Created User Orders Component.
*/

// Importing necessary modules.
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// Importing necessary components.
import MetaData from "../Layout/MetaData";
import Loading from "../Loading/Loading";
import OrderItemCard from "../Layout/OrderItemCard/OrderItemCard";
import { clearErrors, myOrderAction } from '../../Actions/orderAction';
import "./myOrder.css";

// Get User Orders Component.
const MyOrder = () => {

	const dispatch = useDispatch();
	const history = useHistory();

	// Getting User and it's order.
	const { isAuthenticateUser, loading, user } = useSelector(state => state.user);
	const { myOrder, loadingOrder, error } = useSelector(state => state.myOrder);

	useEffect(() => {
		// If user is not logged in then redirect to login page.
		if (!loading) {
			if (isAuthenticateUser === false) {
				history.push('/login');
			}
		}

		// If error shows the error.
		if (error) {
			toast(error);
			dispatch(clearErrors());
		}

		// Dispatch an action which get an user order and put it in store.
		dispatch(myOrderAction());

	}, [history, loading, isAuthenticateUser, error, dispatch]);

	return (
		<Fragment>
			{loadingOrder ? <Loading /> : <Fragment>
				{/* Page title. */}
				{user && <MetaData title={user.userFirstName + "'s Orders..."} />}
				{myOrder && myOrder.length === 0 ? <Fragment>
					<div className="order-container">
						<h2>Your Orders</h2>
						<hr />
						{/* If cart is empty then show this. */}
						<div className="order-empty">
							<p>No Order Yet.</p>
							<hr />
							<a href="/products" className="view-product-btn"> View Products </a>
						</div>
					</div>
				</Fragment> : <Fragment>
					{/* If there are orders. */}
					<div className="order-container">
						<h2>Your Orders</h2>
						<hr />
						{/* Every order Card map. */}
						{myOrder && myOrder.reverse().map((orderItem) => <OrderItemCard orderItem={orderItem} />)}
					</div>
				</Fragment>}
			</Fragment>}


		</Fragment>
	)
}

export default MyOrder