/*
	Date: June 1, 2022
		* Creating a Component for Admin to view Orders.
*/

// Importing necessary modules.
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';

// Importing Icons and Button.
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@material-ui/core';
import { confirm } from "react-confirm-box";

// importing necessary components.
import MetaData from '../../Layout/MetaData';
import Loading from '../../Loading/Loading';
import SideBar from '../Layout/SideBar';
import Heading from '../../Layout/Heading/Heading';
import { adminAllOrder, adminDeleteOrder, clearErrors as clearOrderErrors } from '../../../Actions/Admin/adminOrderAction';
import { clearErrors } from '../../../Actions/userAction';
import { ADMIN_ORDER_DELETE_RESET } from '../../../Constants/Admin/adminOrderConstants';

const OrdersAdmin = () => {

	const dispatch = useDispatch();
	const history = useHistory();

	const { error, loading, user, isAuthenticateUser } = useSelector(state => state.user);

	// Get orders from here.
	const { error: errorOrder, loading: loadingOrder, orders } = useSelector(state => state.adminOrders);
	const { error: errorDeleteOrder, loading: loadingDeleteOrder, status } = useSelector(state => state.adminUpdateOrder);

	// Delete product by admin.
	const deleteOrderID = async (id) => {
		// Popup window to show delete or not.
		const result = await confirm(<div><h3>Are you sure? </h3> <br /> <p> You want to delete this Order? </p></div>);

		// If yes then dispatch the action to delete an ite and reload the page.
		if (result) {
			await dispatch(adminDeleteOrder(id));
			window.location.reload();
			return;
		}
		else
			return;
	}

	// Columns of table with id of link.
	const columns = [
		{
			field: "id",
			headerName: "ID",
			minWidth: 300,
			maxWidth: 300,
			renderCell: (params) => {
				return <Link to={`/admin/order/view/${params.value}`}>{params.value}</Link>
			}
		},
		{
			// Status in green or in red color.
			field: "status",
			headerName: "Order Status",
			minWidth: 201,
			maxWidth: 201,
			cellClassName: (params) => {
				return params.getValue(params.id, "status") === "Delivered" ?
					"green-color" : "red-color";
			}
		},
		{
			field: "orderDate",
			headerName: "Order Date",
			type: "number",
			minWidth: 190,
			maxWidth: 190,
		},
		{
			field: "total",
			headerName: "Total Amount",
			type: "number",
			minWidth: 210,
			maxWidth: 210
		},
		{
			field: "items",
			headerName: "Total Items",
			type: "number",
			minWidth: 190,
			maxWidth: 190
		},
		{
			field: "Actions",
			headerName: "Actions",
			minWidth: 200,
			maxWidth: 200,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<Fragment>
						{/* Edit Button with link to the id of the product. */}
						<Link to={"/admin/order/view/" + params.getValue(params.id, "id")}>
							<EditIcon />
						</Link>
						{/* Delete Button. */}
						<Button>
							<DeleteIcon onClick={(() => deleteOrderID(params.getValue(params.id, "id")))} />
						</Button>
					</Fragment>
				)
			}
		}

	];

	// Getting current date.
	const getDate = (orderItem) => {

		let today = new Date(orderItem.paidAt);
		const yyyy = today.getFullYear();
		let mm = today.getMonth() + 1; // Months start at 0!
		let dd = today.getDate();

		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;

		return today = mm + '/' + dd + '/' + yyyy;
	}

	const rows = [];

	// Rows of the products.
	orders && orders.forEach(order => {
		rows.push({
			id: order._id,
			status: order.orderStatus,
			orderDate: getDate(order),
			total: "$" + order.totalPrice,
			items: order.orderInfo.length
		})
	})

	useEffect(() => {

		// If admin is not logged in then redirect to login page.
		if (!loading)
			if (isAuthenticateUser === false)
				history.push('/login');

		// If user is not admin then cannot access all Orders.
		if (!loading)
			if (isAuthenticateUser === true)
				if (user.userRole !== 'admin') {
					history.push('/');
					toast("Error: Cannot Access this Resource...")
				}

		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		if (errorOrder) {
			toast("Error: " + errorOrder);
			dispatch(clearOrderErrors());
		}

		if (errorDeleteOrder) {
			toast("Error: " + errorDeleteOrder);
			dispatch(clearOrderErrors());
		}

		if (status === true) {
			dispatch({ type: ADMIN_ORDER_DELETE_RESET });
		}

		// Dispatching action to get all orders.
		dispatch(adminAllOrder());

	}, [loading, history, isAuthenticateUser, user, dispatch, error, errorOrder, status, errorDeleteOrder]);

	return (
		<Fragment>
			{loading || loadingOrder || loadingDeleteOrder ? <Loading /> : <Fragment>
				{/* Giving title to the page. */}
				<MetaData title="All Orders -- ADMIN" />
				{/* Sidebar */}
				<SideBar />
				{/* Heading of the page. */}
				<Heading props="All Orders" />
				{/* DataGrid Table. */}
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={10}
					disableSelectionOnClick
					autoHeight
					className='products-admin-grid'
				/>
			</Fragment>}
		</Fragment>
	)
}

export default OrdersAdmin