import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Components/Layout/Headers/Header.js';
import Footer from './Components/Layout/Footer/Footer.js';

function App() {
	return (
		<Router>
			<Header />
			<Footer />
		</Router>
	);
}

export default App;
