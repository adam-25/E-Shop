/*
	Date: May 31, 2022
		* Created Component for admin to get All Products.
	
	Date: June 1, 2022
		* ADMIN delete the product.
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
import { confirm } from "react-confirm-box";

// Importing necessary components.
import SideBar from '../Layout/SideBar';
import MetaData from '../../Layout/MetaData';
import Loading from '../../Loading/Loading';
import Heading from '../../Layout/Heading/Heading';
import { adminAllProducts, adminDeleteProduct, clearErrors } from '../../../Actions/Admin/adminProductsAction';
import { ADMIN_DELETE_PRODUCT_RESET } from '../../../Constants/Admin/adminProductsConstants';
import { clearErrors as userClearError } from '../../../Actions/userAction';
import './ProductsAdmin.css';

// All Products Admin Component.
const ProductsAdmin = () => {

	const history = useHistory();
	const dispatch = useDispatch();

	// Getting user and products from store.
	const { user, loading, isAuthenticateUser, error } = useSelector(state => state.user);
	const { error: productError, products, loading: loadingProduct, status } = useSelector(state => state.adminProducts);

	// Delete product by admin.
	const deleteProductID = async (id) => {
		// Popup window to show delete or not.
		const result = await confirm(<div><h3>Are you sure? </h3> <br /> <p> You want to delete this Product? </p></div>);

		// If yes then dispatch the action to delete an ite and reload the page.
		if (result) {
			await dispatch(adminDeleteProduct(id));
			window.location.reload();
			return;
		}
		else
			return;
	}

	// Columns of the table DataGrid.
	const columns = [
		// Values with heading and field name.
		{
			field: "id",
			headerName: "ID",
			minWidth: 260,
			flex: 0.7,
			renderCell: (params) => {
				return <Link to={`/admin/product/edit/${params.value}`}>{params.value}</Link>
			}
		},
		{
			field: "Name",
			headerName: "Name",
			minWidth: 250,
			flex: 0.53
		},
		{
			field: "Sell",
			headerName: "Total Sell",
			type: "number",
			minWidth: 155,
			flex: 0.4
		},
		{
			field: "Stock",
			headerName: "Stock",
			type: "number",
			minWidth: 150,
			flex: 0.28
		},
		{
			field: "Price",
			headerName: "Price",
			minWidth: 150,
			type: "number",
			flex: 0.29
		}, {
			field: "Actions",
			headerName: "Actions",
			minWidth: 150,
			flex: 0.3,
			type: "number",
			sortable: false,
			// Buttons
			renderCell: (params) => {
				return (
					<Fragment>
						{/* Edit Button with link to the id of the product. */}
						<Link to={"/admin/product/edit/" + params.getValue(params.id, "id")}>
							<EditIcon />
						</Link>
						{/* Delete Button. */}
						<Button>
							<DeleteIcon onClick={(() => deleteProductID(params.getValue(params.id, "id")))} />
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
			id: product.productID,
			Name: product.productName,
			Sell: product.totalSell,
			Stock: product.productStock,
			Price: product.productPrice,
		})
	});

	useEffect(() => {

		// If admin is not logged in then redirect to login page.
		if (!loading)
			if (isAuthenticateUser === false)
				history.push('/login');

		// If user is not admin then cannot access all Products.
		if (!loading)
			if (isAuthenticateUser === true)
				if (user.userRole !== 'admin') {
					history.push('/');
					toast("Error: Cannot Access this Resource...")
				}

		if (productError) {
			toast("Error: " + productError);
			dispatch(clearErrors());
		}

		if (error) {
			toast("Error: " + error);
			dispatch(userClearError());
		}

		if (status === true) {
			dispatch({ type: ADMIN_DELETE_PRODUCT_RESET });
		}


		// Dispatching action to get all products.
		dispatch(adminAllProducts());

	}, [loading, history, isAuthenticateUser, user, dispatch, productError, status, error]);

	return (
		<Fragment>
			{loadingProduct || loading ? <Loading /> : <Fragment>
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