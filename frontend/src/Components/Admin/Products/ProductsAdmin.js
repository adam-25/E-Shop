/*
	Date: May 31, 2022
		* Created Component for admin to get All Products.
	
	Date: June 1, 2022
		* ADMIN delete the product.
*/

// Importing necessary modules.
import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DataGrid } from "@material-ui/data-grid";
import { Link } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Importing Icons and Button.
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@material-ui/core';

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
	const { error: productError, products, loading: loadingProduct } = useSelector(state => state.adminProducts);
	const { error: productUpdateError, loading: loadingUpdateProduct, status } = useSelector(state => state.adminUpdateProduct);

	const [open, setOpen] = useState(false);
	const [deleteID, setDeleteID] = useState();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const handleClickOpen = () => {
		setOpen(true);
	};

	// When popup closed.
	const handleClose = () => {
		setOpen(false);
	};

	const settingDeleteID = (id) => {
		setDeleteID(id);
		handleClickOpen();
	}

	// Delete product by admin.
	const deleteProductID = async () => {
		await dispatch(adminDeleteProduct(deleteID));
		handleClose();
		window.location.reload();
	}

	// Columns of the table DataGrid.
	const columns = [
		// Values with heading and field name.
		{
			field: "id",
			headerName: "ID",
			minWidth: 310,
			maxWidth: 310,
			renderCell: (params) => {
				return <Link to={`/admin/product/edit/${params.value}`}>{params.value}</Link>
			}
		},
		{
			field: "Name",
			headerName: "Name",
			minWidth: 280,
			maxWidth: 280
		},
		{
			field: "Sell",
			headerName: "Total Sell",
			type: "number",
			minWidth: 190,
			maxWidth: 190
		},
		{
			field: "Stock",
			headerName: "Stock",
			type: "number",
			minWidth: 175,
			maxWidth: 175
		},
		{
			field: "Price",
			headerName: "Price",
			minWidth: 175,
			type: "number",
			maxWidth: 175
		}, {
			field: "Actions",
			headerName: "Actions",
			minWidth: 175,
			maxWidth: 175,
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
							<DeleteIcon onClick={() => settingDeleteID(params.getValue(params.id, "id"))} />
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

		if (productUpdateError) {
			toast("Error: " + productUpdateError);
			dispatch(clearErrors());
		}

		if (status === true) {
			dispatch({ type: ADMIN_DELETE_PRODUCT_RESET });
		}


		// Dispatching action to get all products.
		dispatch(adminAllProducts());

	}, [loading, history, isAuthenticateUser, user, dispatch, productError, status, error, productUpdateError]);

	return (
		<Fragment>
			{loadingProduct || loading || loadingUpdateProduct ? <Loading /> : <Fragment>
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
			<div className='popup-review'>
				{/* When Dialog box opens when close. */}
				<Dialog
					fullScreen={fullScreen}
					open={open}
					onClose={handleClose}
					aria-labelledby="responsive-dialog-title"
				>
					{/* Title of the popup */}
					<DialogTitle id="responsive-dialog-title" style={{ fontFamily: "Comic Neue, cursive", fontSize: "2.5rem" }} >
						Are you sure?
					</DialogTitle>
					<DialogContent>
						{/* rating to set */}
						<div>
						</div>
						{/* TextArea where comment is written */}
						<div className='paragraph-tag-pop-up'>
							<div>
								<p>You want to delete this Product?</p>
							</div>
							<div>
								{/* Submit Button. */}
								<button id="review-popup-button" onClick={deleteProductID}>
									Delete
								</button>
								{/* Cancel Button */}
								<button id="review-popup-button" onClick={handleClose}>
									Cancel
								</button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</Fragment>
	)
}

export default ProductsAdmin