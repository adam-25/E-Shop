/*
	Date: May 31, 2022
		* Create admin dashboard component.
*/

// Importing necessary modules.
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Line, Pie } from 'react-chartjs-2';

// Importing components.
import SideBar from "../Layout/SideBar";
import Loading from "../../Loading/Loading";
import MetaData from '../../Layout/MetaData';
import Heading from '../../Layout/Heading/Heading';
import { adminAllOrder } from '../../../Actions/Admin/adminOrderAction';
import { adminAllUsers } from '../../../Actions/Admin/adminUsersAction';
import { adminAllProducts } from '../../../Actions/Admin/adminProductsAction';
import './Dashboard.css';

const DashBoard = () => {

	const history = useHistory();
	const dispatch = useDispatch();

	// Get user, orders, products, and all users data.
	const { user, loading, isAuthenticateUser } = useSelector(state => state.user);
	const { totalEarnings, orders } = useSelector(state => state.adminOrders);
	const { products } = useSelector(state => state.adminProducts);
	const { users } = useSelector(state => state.adminUsers);

	// Creating array of products in stock and out of stock.
	const productsInStock = products.filter(product => product.productStock > 0);
	const productsOutOfStock = products.filter(product => product.productStock === 0);

	// Line graph
	const lineState = {
		labels: ["Initial Sale", "Current Sale"],
		datasets: [
			{
				label: "Total Sale",
				backgroundColor: ["#8B0000", "#507463"],
				hoverBackgroundColor: ["#6173B3", "#323232"],
				data: [0, totalEarnings]
			}
		]
	}

	// Pie Graph
	const pieState = {
		labels: ["Out of Stock", "In Stock"],
		datasets: [
			{
				label: "Products Stock",
				backgroundColor: ["#8B0000", "#507463"],
				hoverBackgroundColor: ["#354259", "#323232"],
				data: [productsOutOfStock.length, productsInStock.length]
			}
		]
	}

	useEffect(() => {

		if (!window.location.hash) {
			window.location = window.location + '#loaded';
			window.location.reload();
		}

		// If admin is not logged in then redirect to login page.
		if (!loading)
			if (isAuthenticateUser === false)
				history.push('/login');

		// If user is not admin then cannot access dashboard.
		if (!loading)
			if (isAuthenticateUser === true)
				if (user.userRole !== 'admin') {
					history.push('/');
					toast("Error: Cannot Access this Resource...")
				}

		// Dispatching action to get all orders, products, users.
		dispatch(adminAllOrder());
		dispatch(adminAllProducts());
		dispatch(adminAllUsers());

	}, [loading, history, isAuthenticateUser, user, dispatch]);

	return (
		<Fragment>
			{loading ? <Loading /> : <Fragment>
				{/* Title of the page. */}
				<MetaData title="Dashboard -- ADMIN" />
				{/* SideBar */}
				<SideBar />
				<div style={{ marginTop: "30px" }}></div>

				{/* Heading DashBoard */}
				<Heading props="Dashboard" />

				{/* Summery of everything */}
				<div className='summery-dashboard'>
					{/* Total Sale Summery */}
					<div className='total-sale-dashboard'>
						<h5>Total Sales</h5>
						<h5>${totalEarnings}</h5>
					</div>
					<div className='dashboard-info'>
						{/* Total Products */}
						<div className='dashboard-information-specific'>
							<h5>Total Products</h5>
							<h5>{products.length}</h5>
						</div>
						{/* Total Orders */}
						<div className='dashboard-information-specific'>
							<h5>Total Orders</h5>
							<h5>{orders.length}</h5>
						</div>
						{/* Total Users */}
						<div className='dashboard-information-specific'>
							<h5>Total Users</h5>
							<h5>{users.length}</h5>
						</div>
					</div>
					{/* Graphs */}
					<div className='chart'>
						{/* Line Graph */}
						<div>
							<Line data={lineState} />
						</div>
						<hr />
						{/* Pie Chart */}
						<div>
							<Pie data={pieState} />
						</div>
					</div>
				</div>

			</Fragment>}
		</Fragment>
	)
}

export default DashBoard