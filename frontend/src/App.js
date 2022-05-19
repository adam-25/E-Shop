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
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Importing Components.
import Header from './Components/Layout/Headers/Header.js';
import Footer from './Components/Layout/Footer/Footer.js';
import Home from './Components/Home/Home';
import SpecificProduct from './Components/SpecificProduct/SpecificProduct';
import Products from "./Components/Products/Products";
import LoginRegister from './Components/User/LoginRegister';

function App() {
	return (
		<Router>
			{/* Navbar Header */}
			<Header />

			{/* Path for different pages */}
			<Route exact path="/" component={Home} />
			<Route exact path="/product/:id" component={SpecificProduct} />
			<Route exact path="/products" component={Products} />
			<Route path="/products/:searchWords" component={Products} />

			<Route path="/login" component={LoginRegister} />

			{/* Footer of the website. */}
			<Footer />
		</Router>
	);
}

export default App;
