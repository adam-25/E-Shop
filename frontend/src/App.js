/*
	Date: May 13, 2022
		* Created App for ECommerce
		* Created Header, Footer Component.
	
	Date: May 15, 2022
		* Created Home Route.

	Date: May 17, 2022
		* Created SpecificProduct and All Products Route.
		* Add Route to show products When it's is searched
*/

// Importing CSS and Router, doms.
import './App.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// Importing Components.
import Header from './Components/Layout/Headers/Header.js';
import Footer from './Components/Layout/Footer/Footer.js';
import Home from './Components/Home/Home';
import SpecificProduct from './Components/SpecificProduct/SpecificProduct';
import Products from "./Components/Products/Products";
import LoginRegister from './Components/User/LoginRegister';
import UserOptions from "./Components/Layout/UserOptions/UserOptions";
import { loadUser } from './Actions/userAction';
import Account from './Components/Account/Account';
import UpdateName from './Components/UpdateDetails/UpdateName';
import UpdateEmail from './Components/UpdateDetails/UpdateEmail';
import Logout from './Components/Logout/Logout';

function App() {

	// let history = useHistory();

	const dispatch = useDispatch();
	const { isAuthenticateUser } = useSelector(state => state.user);

	useEffect(() => {
		dispatch(loadUser());

	}, [dispatch]);

	return (
		<Router>
			{/* Navbar Header */}
			<Header />

			{(window.location.pathname !== "/" && isAuthenticateUser) ? <UserOptions /> : <div></div>}
			{(window.location.pathname === "/logout" && !isAuthenticateUser) ? <Redirect to="/login" /> : <div></div>}

			{/* Path for different pages */}
			<Route exact path="/" component={Home} />
			<Route exact path="/product/:id" component={SpecificProduct} />
			<Route exact path="/products" component={Products} />
			<Route path="/products/:searchWords" component={Products} />
			<Route exact path="/login" component={LoginRegister} />
			<Route exact path="/account" component={Account} />
			<Route exact path="/updateName" component={UpdateName} />
			<Route exact path="/updateEmail" component={UpdateEmail} />
			<Route exact path="/logout" component={Logout} />

			{/* Footer of the website. */}
			<Footer />
		</Router>
	);
}

export default App;
