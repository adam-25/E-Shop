/*
	Date: June 2, 2022
		* Add Route to View all reviews of particular product for ADMIN.
*/

// Importing necessary modules.
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirm } from "react-confirm-box";

// Importing necessary components.
import MetaData from '../../Layout/MetaData';
import SideBar from '../Layout/SideBar';
import Heading from '../../Layout/Heading/Heading';
import Loading from '../../Loading/Loading';
import { clearErrors as userClearError } from '../../../Actions/userAction';
import { adminAllReviews, adminDeleteReview, clearErrors } from '../../../Actions/Admin/adminProductsAction';
import './reviewAdmin.css';
import { ADMIN_DELETE_REVIEW_RESET } from '../../../Constants/Admin/adminProductsConstants';

// All Reviews of product to admin.
const ReviewsAdmin = () => {

	const history = useHistory();
	const dispatch = useDispatch();

	const [productID, setProductID] = useState('');

	const { loading, isAuthenticateUser, error, user } = useSelector(state => state.user);
	const { reviews, loading: reviewLoading, error: reviewError } = useSelector(state => state.adminReview);
	const { status, loading: deleteReviewLoading, error: deleteReviewError } = useSelector(state => state.adminDeleteReview);

	const getProductReviews = async () => {
		dispatch(adminAllReviews(productID));
	}

	// Delete Review by admin.
	const deleteReviewID = async (id) => {
		// Popup window to show delete or not.
		console.log(id + " " + productID);
		const result = await confirm(<div><h3>Are you sure? </h3> <br /> <p> You want to delete this Order? </p></div>);

		// If yes then dispatch the action to delete an review and reload the page.
		if (result) {
			await dispatch(adminDeleteReview(id, productID));
			window.location.reload();
			return;
		}
		else
			return;
	}

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
			field: "name",
			headerName: "Reviewer Name",
			minWidth: 250,
			maxWidth: 250,
		},
		{
			field: "comment",
			headerName: "Comment",
			minWidth: 470,
			maxWidth: 470,
		},
		{
			field: "rating",
			headerName: "Rating",
			type: "number",
			minWidth: 150,
			maxWidth: 150,
			cellClassName: (params) => {
				return params.getValue(params.id, "rating") > 2 ?
					"green-color" : "red-color";
			}
		},
		{
			field: "Actions",
			headerName: "Actions",
			minWidth: 150,
			maxWidth: 150,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<Fragment>
						{/* Delete Button. */}
						<Button>
							<DeleteIcon onClick={(() => deleteReviewID(params.getValue(params.id, "id")))} />
						</Button>
					</Fragment>
				)
			}
		}

	]
	const rows = [];

	reviews && reviews.forEach((review) => {
		rows.push({
			id: review._id,
			name: review.reviewerName,
			comment: review.commentOnProduct,
			rating: review.ratingOfTheProduct,
			items: review.items
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

		if (error) {
			toast("Error: " + error);
			dispatch(userClearError());
		}

		if (reviewError) {
			toast("Error: " + reviewError);
			dispatch(clearErrors());
		}

		if (deleteReviewError) {
			toast("Error: " + deleteReviewError);
			dispatch(clearErrors());
		}

		if (status) {
			dispatch({ type: ADMIN_DELETE_REVIEW_RESET });
		}

	}, [loading, history, isAuthenticateUser, user, dispatch, error, reviews, reviewError, deleteReviewError, status]);

	return (
		<Fragment>
			{loading || reviewLoading || deleteReviewLoading ? <Loading /> : <Fragment>
				{/* Giving title to the page. */}
				<MetaData title="All Reviews -- ADMIN" />
				{/* SideBar */}
				<SideBar />
				{/* Heading of the page. */}
				<Heading props="All Reviews..." />

				<div>
					<div className='product-review-info-id'>
						<h2>Product ID</h2>
						<input type="text" value={productID} placeholder='Product ID...' onChange={(e) => { setProductID(e.target.value) }} />
						<button onClick={getProductReviews}>Get Reviews</button>
					</div>
					<div style={{ marginTop: "50px" }}></div>
					<div>
						{/* Product Reviews. */}
						{/* DataGrid Table. */}
						{reviews[0] ?
							< DataGrid
								rows={rows}
								columns={columns}
								pageSize={10}
								disableSelectionOnClick
								autoHeight
								className='products-admin-grid'
							/> : <p className="product-no-review">No Review Yet</p>}
					</div>
				</div>

			</Fragment>}
		</Fragment>
	)
}

export default ReviewsAdmin;