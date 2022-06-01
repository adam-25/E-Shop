/*
	Date: May 31, 2022
		* Created Component for admin to get All Products.
*/

// Importing necessary modules.
import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DataGrid } from "@material-ui/data-grid";
import { Link } from 'react-router-dom';

// Importing Icons and Button.
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@material-ui/core';

// Importing necessary components.
import SideBar from '../Layout/SideBar';
import MetaData from '../../Layout/MetaData';
import Loading from '../../Loading/Loading';
import Heading from '../../Layout/Heading/Heading';
import { adminAllProducts, clearErrors } from '../../../Actions/Admin/adminProductsAction';
import './ProductsAdmin.css';

// All Products Admin Component.
const ProductsAdmin = () => {

	const history = useHistory();
	const dispatch = useDispatch();

	// Getting user and products from store.
	const { user, loading, isAuthenticateUser } = useSelector(state => state.user);
	const { error, products, loading: loadingProduct } = useSelector(state => state.adminProducts);

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

		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		// Dispatching action to get all products.
		dispatch(adminAllProducts());

	}, [loading, history, isAuthenticateUser, user, dispatch, error]);

	// Columns of the table DataGrid.
	const columns = [
		// Values with heading and field name.
		{
			field: "id",
			headerName: "Product ID",
			minWidth: 250,
			flex: 0.7
		},
		{
			field: "Name",
			headerName: "Product Name",
			minWidth: 250,
			flex: 0.6
		}, 
		{
			field: "Stock",
			headerName: "Product Stock",
			type: "number",
			minWidth: 200,
			flex: 0.4
		}, 
		{
			field: "Price",
			headerName: "Product Price",
			minWidth: 200,
			type: "number",
			flex: 0.4
		}, {
			field: "Actions",
			headerName: "Product Actions",
			minWidth: 200,
			flex: 0.4,
			type: "number",
			sortable: false,
			// Buttons
			renderCell: (params) => {
				return (
					<Fragment>
						{/* Edit Button with link to the id of the product. */}
						<Link to={"/admin/products/" + params.getValue(params.id, "id")}>
							<EditIcon />
						</Link>
						{/* Delete Button. */}
						<Button>
							<DeleteIcon />
						</Button>
					</Fragment>
				)
			}
		},
	]

	const rows = [];

	// Products adding to rows array.
	products && products.forEach(product => {
		rows.push({
			id: product._id,
			Name: product.productName,
			Stock: product.productStock,
			Price: product.productPrice,
		})
	});

	return (
		<Fragment>
			{loadingProduct ? <Loading /> : <Fragment>
				{/* Giving title to the page. */}
				<MetaData title="All Products -- ADMIN" />
				{/* SideBar */}
				<SideBar />
				{/* Heading of the page. */}
				<Heading props="All Products" />
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

export default ProductsAdmin