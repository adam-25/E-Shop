/*
	Date: May 13, 2022
		* Created App for ECommerce
		* Created Header, Footer Component.
	
	Date: May 15, 2022
		* Created Home Route.

	// Products
	Date: May 17, 2022
		* Created SpecificProduct and All Products Route.
		* Add Route to show products When it's is searched.

	// Login
	Date: May 19, 2022
		* Add Route of Login page.
		* Add to check that user is logged in or not.

	// Updating User information.
	Date: May 20, 2022
		* Add UserOptions when it logged in.
		* Add Loading, Logout and Account page Routes.
		* Add Update User Name and Password when logged in Routes.

	Date: May 21, 2022
		* Add Update Password route while user logged in.
		* Add Forgot Password Route.
		* Add Route which have the component of resetting the password.

	// Cart
	Date: May 23, 2022
		* Add Cart Route.

	// CheckOut
	Date: May 25, 2022
		* Add Shipping Information Route.

	Date: May 26, 2022
		* Add Reviewing order Route in process of Checkout.

	// Order
	Date: May 29, 2022
		* Add Payment Route with stripe.
		* Add myOrders for user.

	Date: May 30, 2022
		* Add Route for Particular Order Details.

	// ADMIN
	Date: May 30, 2022
		* Add Dashboard Route for Admin.
	
	Date: May 31, 2022
		* Add All Products Route for Admin.
		* Add Route to Create a Product ADMIN.

	Date: June 1, 2022
		* Add Route to Update a Product.
		* Add Route where Admin can details of a particular order.

	Date: June 2, 2022
		* Add Route to View all orders ADMIN
		* Add Route to update orders by ADMIN.
		* Add Route to view all Users ADMIN.
		* Add Route to update Users by ADMIN.
		* Add Routes to get All reviews and update or delete reviews by ADMIN.
	
	Date: June 3, 2022
		* Add Route to Not Found Page.

*/

// Importing CSS and Router, doms.
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Importing Components.
import Header from './Components/Layout/Headers/Header.js';
import Footer from './Components/Layout/Footer/Footer.js';
import Home from './Components/Home/Home';
import SpecificProduct from './Components/SpecificProduct/SpecificProduct';
import Products from "./Components/Products/Products";
import LoginRegister from './Components/Login/LoginRegister';
import UserOptions from "./Components/Layout/UserOptions/UserOptions";
import { loadUser } from './Actions/userAction';
import Account from './Components/Account/Account';
import UpdateName from './Components/UpdateDetails/UpdateName';
import UpdateEmail from './Components/UpdateDetails/UpdateEmail';
import UpdatePassword from './Components/UpdateDetails/UpdatePassword.js';
import ForgotPassword from './Components/UpdateDetails/ForgotPassword.js';
import ResetPassword from './Components/UpdateDetails/ResetPassword.js';
import Logout from './Components/Logout/Logout';
import Cart from "./Components/Cart/Cart";
import ShippingInformation from "./Components/Checkout/ShippingInformation";
import OrderReviewAndConfirm from "./Components/Checkout/OrderReviewAndConfirm.js";
import Payment from "./Components/Checkout/Payment.js";
import OrderPlaceSuccess from "./Components/Checkout/OrderPlaceSuccess.js";
import MyOrder from './Components/MyOrder/MyOrder.js';
import SpecificOrder from './Components/SpecificOrder/SpecificOrder.js';
import NotFound from './Components/NotFound/NotFound.js';

// ADMIN Routes.
import DashBoard from "./Components/Admin/Dashboard/DashBoard";
import ProductsAdmin from './Components/Admin/Products/ProductsAdmin';
import CreateNewProduct from './Components/Admin/CreateNewProduct/CreateNewProduct.js';
import UpdateProduct from './Components/Admin/UpdateProduct/UpdateProduct.js';
import OrdersAdmin from './Components/Admin/Orders/OrdersAdmin.js';
import SpecificOrderAdmin from './Components/Admin/Orders/SpecificOrderAdmin.js';
import UsersAdmin from './Components/Admin/Users/UsersAdmin.js';
import SpecificUserAdmin from './Components/Admin/Users/SpecificUserAdmin.js';
import UpdateUserNameAdmin from './Components/Admin/Users/UpdateDetails/UpdateUserNameAdmin.js';
import UpdateUserEmailAdmin from './Components/Admin/Users/UpdateDetails/UpdateUserEmailAdmin.js';
import ReviewsAdmin from './Components/Admin/Reviews/ReviewsAdmin.js';

function App() {

	const dispatch = useDispatch();
	const { isAuthenticateUser } = useSelector(state => state.user);

	// Getting payment stripe key from the backend and store in paymentAPIKey.
	const [paymentAPIKey, setPaymentAPIKey] = useState();

	// Getting stripe key from the backend and store in paymentAPIKey.
	async function getPaymentAPIKey() {
		const { data } = await axios.get('api/v1/stripeAPIKey');

		setPaymentAPIKey(data.stripe_api_key);
	}

	useEffect(() => {
		dispatch(loadUser());

		getPaymentAPIKey();

	}, [dispatch]);

	return (
		<Router>
			{/* Navbar Header */}
			<Header />

			{/* If User is logged out and go to logout path then redirect to login */}
			{(window.location.pathname !== "/" && isAuthenticateUser === true) ? <UserOptions /> : null}
			{(window.location.pathname === "/logout" && !isAuthenticateUser) ? <Redirect to="/login" /> : null}

			{paymentAPIKey &&
				<Elements stripe={loadStripe(paymentAPIKey)}>
					<Route exact path="/payment" component={Payment} />
				</Elements>
			}

			{/* Path for different pages */}
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/product/:id" component={SpecificProduct} />
				<Route exact path="/products" component={Products} />
				<Route path="/products/:searchWords" component={Products} />
				<Route exact path="/login" component={LoginRegister} />
				<Route exact path="/account" component={Account} />
				<Route exact path="/updateName" component={UpdateName} />
				<Route exact path="/updateEmail" component={UpdateEmail} />
				<Route exact path="/logout" component={Logout} />
				<Route exact path="/password/update" component={UpdatePassword} />
				<Route exact path="/password/forgotPassword" component={ForgotPassword} />
				<Route exact path="/password/reset/:resetToken" component={ResetPassword} />
				<Route exact path="/cart" component={Cart} />
				<Route exact path="/order/shippingInfo" component={ShippingInformation} />
				<Route exact path="/order/reviewAndConfirm" component={OrderReviewAndConfirm} />
				<Route exact path="/success" component={OrderPlaceSuccess} />
				<Route exact path="/myOrders" component={MyOrder} />
				<Route exact path="/orderDetail/:id" component={SpecificOrder} />
				<Route exact path="/dashboard" component={DashBoard} />
				<Route exact path="/admin/products" component={ProductsAdmin} />
				<Route exact path="/admin/newProduct" component={CreateNewProduct} />
				<Route exact path="/admin/product/edit/:id" component={UpdateProduct} />
				<Route exact path="/admin/orders" component={OrdersAdmin} />
				<Route exact path="/admin/order/view/:id" component={SpecificOrderAdmin} />
				<Route exact path="/admin/users" component={UsersAdmin} />
				<Route exact path="/admin/user/view/:id" component={SpecificUserAdmin} />
				<Route exact path="/admin/updateUserName/:id" component={UpdateUserNameAdmin} />
				<Route exact path="/admin/updateUserEmail/:id" component={UpdateUserEmailAdmin} />
				<Route exact path="/admin/reviews" component={ReviewsAdmin} />
				<Route component={window.location.pathname === '/payment' ? null : NotFound} />
			</Switch>

			{/* Footer of the website. */}
			<Footer />
		</Router>
	);
}

export default App;
