/*
	Date: May 31, 2022
		* Created Component for admin to update Products.
*/

// Importing necessary modules.
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// Importing Icons.
import AbcIcon from '@mui/icons-material/Abc';
import DescriptionIcon from '@mui/icons-material/Description';
import SellIcon from '@mui/icons-material/Sell';
import StorageIcon from '@mui/icons-material/Storage';
import CategoryIcon from '@mui/icons-material/Category';
import ImageIcon from '@mui/icons-material/Image';

// Importing necessary components.
import MetaData from '../../Layout/MetaData';
import Heading from '../../Layout/Heading/Heading';
import Loading from '../../Loading/Loading';
import SideBar from '../Layout/SideBar';
import { adminUpdateProduct, clearErrors, getAdminOneProduct } from '../../../Actions/Admin/adminProductsAction';
import { ADMIN_UPDATE_PRODUCT_RESET } from '../../../Constants/Admin/adminProductsConstants';
import { clearErrors as clearUserError } from '../../../Actions/userAction';

// Creating new Product Component.
const UpdateProduct = ({ match }) => {

	const history = useHistory();
	const dispatch = useDispatch();

	// Getting user and products from store.
	const { user, loading, isAuthenticateUser, error: userError } = useSelector(state => state.user);
	const { error, status, loading: loadingUpdateProduct } = useSelector(state => state.adminUpdateProduct);
	const { oneAdminProduct, loading: loadingOneProduct, error: orderError } = useSelector(state => state.adminGetOneProduct);

	// useState to set value of each input.
	const [productName, setProductName] = useState();
	const [productDescription, setProductDescription] = useState();
	const [productPrice, setProductPrice] = useState();
	const [productStock, setProductStock] = useState();
	const [productCategory, setProductCategory] = useState();
	const [productImages, setProductImages] = useState([]);
	const [oldProductImages, setOldProductImages] = useState([]);
	const [productImagePreview, setProductImagePreview] = useState([]);

	// When Form is submitted.
	const updateProductSubmit = (e) => {
		e.preventDefault();

		// Data to send to backend.
		const productData = {
			productName,
			productDescription,
			productPrice,
			productStock,
			productCategory,
			productImages
		}

		setOldProductImages([]);

		// dispatch action to update new product.
		dispatch(adminUpdateProduct(productData, match.params.id));

	}

	// Adding images to productImage and productImagePreview array.
	const addImages = (e) => {
		const imageFiles = Array.from(e.target.files);

		// Set Array to empty.
		setProductImages([]);
		setProductImagePreview([]);

		// Loop through each image and add to productImage and productImagePreview array.
		imageFiles.forEach(imageFile => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setProductImagePreview(prevState => [...prevState, reader.result]);
					setProductImages(prevState => [...prevState, reader.result]);
				}
			};

			reader.readAsDataURL(imageFile);
		})
	}

	useEffect(() => {

		// If admin is not logged in then redirect to login page.
		if (!loading)
			if (isAuthenticateUser === false)
				history.push('/login');

		// If user is not admin then cannot access update product.
		if (!loading)
			if (isAuthenticateUser === true)
				if (user.userRole !== 'admin') {
					history.push('/');
					toast("Error: Cannot Access this Resource...")
				}

		// If error then toast error and clear error.
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		if (orderError) {
			toast("Error: " + orderError);
			dispatch(clearErrors());
		}

		if (userError) {
			toast("Error: " + userError);
			dispatch(clearUserError());
		}

		// If product creation is successful then toast success and redirect to dashboard.
		if (status === true) {
			dispatch({ type: ADMIN_UPDATE_PRODUCT_RESET });
			history.push('/admin/products');
		}

		if (oneAdminProduct && oneAdminProduct.productID !== match.params.id)
			dispatch(getAdminOneProduct(match.params.id));
		else {
			setProductName(oneAdminProduct.productName);
			setProductDescription(oneAdminProduct.productDescription);
			setProductPrice(oneAdminProduct.productPrice);
			setProductStock(oneAdminProduct.productStock);
			setProductCategory(oneAdminProduct.productCategory);
			setOldProductImages(oneAdminProduct.productImages);
		}

	}, [loading, history, isAuthenticateUser, user, dispatch, error, status, match.params.id, orderError, userError, oneAdminProduct]);

	return (
		<Fragment>
			{loadingUpdateProduct || loading || loadingOneProduct ? <Loading /> : <Fragment>
				{/* Title of the page */}
				<MetaData title="Update Product -- ADMIN" />
				{/* Side Bar */}
				<SideBar />
				{/* heading of the page */}
				<Heading props="Update Product Info..." />
				<div className='new-product-container'>
					{/* Form of creating a product */}
					<form className='product-create-form' onSubmit={updateProductSubmit}>
						{/* Product Name Div */}
						<div>
							<h5> Product Name: </h5>
							<AbcIcon />
							<input
								type="text"
								placeholder={oneAdminProduct.productName}
								value={productName}
								required
								onChange={(e) => setProductName(e.target.value)} />
						</div>
						{/* Product Price Div */}
						<div>
							<h5> Product Price: </h5>
							<SellIcon />
							<input
								type="number"
								placeholder={oneAdminProduct.productPrice}
								value={productPrice}
								required
								onChange={(e) => setProductPrice(e.target.value)} />
						</div>
						{/* Product Category Div */}
						<div>
							<h5> Product Category: </h5>
							<CategoryIcon />
							<input
								type="text"
								placeholder={oneAdminProduct.productCategory}
								required
								value={productCategory}
								onChange={(e) => setProductCategory(e.target.value)} />
						</div>
						{/* Product Description Div */}
						<div>
							<h5> Product Description: </h5>
							<DescriptionIcon />
							<textarea
								placeholder={oneAdminProduct.productDescription}
								required
								value={productDescription}
								onChange={(e) => setProductDescription(e.target.value)}
								rows="2"
								cols="30" />
						</div>
						{/* Product Stock Div */}
						<div>
							<h5> Product Stock: </h5>
							<StorageIcon />
							<input
								type="number"
								placeholder={oneAdminProduct.productStock}
								required
								value={productStock}
								onChange={(e) => setProductStock(e.target.value)} />
						</div>
						{/* Product Image Div */}
						<div className='product-image'>
							<h5> Product Images: </h5>
							<ImageIcon />
							<input
								type="file"
								accept='image/*'
								name='Product Image'
								required
								onChange={addImages}
								multiple
							/>
						</div>
						{/* Product Image Preview Div */}
						{/* Shows the added Images. */}
						<div className='product-image-preview'>
							<h5> Old Product Images Preview: </h5>
							<div>
								{oldProductImages && oldProductImages.map((image, index) => {
									return (
										<img src={image.imageURL} alt={index} key={index} />
									)
								})}
							</div>
						</div>
						{/* Product Image Preview Div */}
						{/* Shows the added Images. */}
						<div className='product-image-preview'>
							<h5> New Product Images Preview: </h5>
							<div>
								{productImagePreview.map((image, index) => {
									return (
										<img src={image} alt={index} key={index} />
									)
								})}
							</div>
						</div>
						{/* Button disable when loading to submit the updated product. */}
						<button disabled={loadingUpdateProduct ? true : false} type="submit" className='create-product-button' >
							Update Product
						</button>
					</form>
				</div>
			</Fragment>}
		</Fragment>
	)
}

export default UpdateProduct