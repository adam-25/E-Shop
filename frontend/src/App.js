import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Header from './Components/Layout/Headers/Header.js';
import Footer from './Components/Layout/Footer/Footer.js';
import Home from './Components/Layout/Home/Home.js';

function App() {
	return (
		<Router>
			<Header />
			<Route exact path="/" component={Home} />
			<Footer />
		</Router>
	);
}

export default App;
