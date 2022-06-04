/*
	Date: May 31, 2022
		* Created Component for admin to create new Products.
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
import { adminCreateNewProduct, clearErrors } from '../../../Actions/Admin/adminProductsAction';
import { clearErrors as userErrorNull } from '../../../Actions/userAction';
import { ADMIN_NEW_PRODUCT_RESET } from '../../../Constants/Admin/adminProductsConstants';
import './newProduct.css';

// Creating new Product Component.
const CreateNewProduct = () => {

	const history = useHistory();
	const dispatch = useDispatch();

	// Getting user and products from store.
	const { user, loading, isAuthenticateUser, error: userError } = useSelector(state => state.user);
	const { error, status, loading: loadingNewProduct } = useSelector(state => state.adminCreateNewProduct);

	// useState to set value of each input.
	const [productName, setProductName] = useState();
	const [productDescription, setProductDescription] = useState();
	const [productPrice, setProductPrice] = useState();
	const [productStock, setProductStock] = useState();
	const [productCategory, setProductCategory] = useState();
	const [productImages, setProductImages] = useState([]);
	const [productImagePreview, setProductImagePreview] = useState([]);

	// When Form is submitted.
	const createProductSubmit = () => {

		// Data to send to backend.
		const productData = {
			productName,
			productDescription,
			productPrice,
			productStock,
			productCategory,
			productImages
		}

		// dispatch action to create new product.
		dispatch(adminCreateNewProduct(productData));
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

		// If user is not admin then cannot access product creation.
		if (!loading)
			if (isAuthenticateUser === true)
				if (user.userRole !== 'admin') {
					history.push('/');
					toast("Error: Cannot Access this Resource...")
				}

		if (userError) {
			toast("Error: " + userError);
			dispatch(userErrorNull());
		}

		// If error then toast error and clear error.
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		// If product creation is successful then toast success and redirect to dashboard.
		if (status === true) {
			dispatch({ type: ADMIN_NEW_PRODUCT_RESET });
			history.push('/dashboard');
		}

	}, [loading, history, isAuthenticateUser, user, dispatch, error, status, userError]);

	return (
		<Fragment>
			{loadingNewProduct || loading ? <Loading /> : <Fragment>
				{/* Title of the page */}
				<MetaData title="Create New Product -- ADMIN" />
				{/* Side Bar */}
				<SideBar />
				{/* heading of the page */}
				<Heading props="New Product Info..." />
				<div className='new-product-container'>
					{/* Form of creating a product */}
					<form className='product-create-form' onSubmit={createProductSubmit}>
						{/* Product Name Div */}
						<div>
							<h5> Product Name: </h5>
							<AbcIcon />
							<input
								type="text"
								placeholder='Product Name...'
								required
								value={productName}
								onChange={(e) => setProductName(e.target.value)} />
						</div>
						{/* Product Price Div */}
						<div>
							<h5> Product Price: </h5>
							<SellIcon />
							<input
								type="number"
								placeholder='Product Price...'
								required
								value={productPrice}
								onChange={(e) => setProductPrice(e.target.value)} />
						</div>
						{/* Product Category Div */}
						<div>
							<h5> Product Category: </h5>
							<CategoryIcon />
							<input
								type="text"
								placeholder='Product Category...'
								required
								value={productCategory}
								onChange={(e) => setProductCategory(e.target.value)} />
						</div>
						{/* Product Description Div */}
						<div>
							<h5> Product Description: </h5>
							<DescriptionIcon />
							<textarea
								placeholder='Product Description...'
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
								placeholder='Product Stock...'
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
								onChange={addImages}
								multiple
								required />
						</div>
						{/* Product Image Preview Div */}
						{/* Shows the added Images. */}
						<div className='product-image-preview'>
							<h5> Product Images Preview: </h5>
							<div>
								{productImagePreview.map((image, index) => {
									return (
										<img src={image} alt={index} key={index} />
									)
								})}
							</div>
						</div>
						{/* Button disable when loading to submit the created product. */}
						<button disabled={loadingNewProduct ? true : false} type="submit" className='create-product-button' >
							Create Product
						</button>
					</form>
				</div>
			</Fragment>}
		</Fragment>
	)
}

export default CreateNewProduct