/*
	Date: May 13, 2022
		* Index JS File of the Project.
	
	Date: May 16, 2022
		* Add Alert with Options
*/

// Importing React and DOM.
import React from 'react';
import ReactDOM from "react-dom";

// Importing CSS and JS Files.
import './index.css';
import App from './App';

// Importing Provider for store.
import { Provider } from 'react-redux';
import store from './Store';


// Importing ToastContainer and it's CSS for Error PopUp.
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Options for Error PopUp.
const options = {
	position: "bottom-center",
	autoClose: 3000,
	hideProgressBar: false,
	newestOnTop: false,
	closeOnClick: true,
	rtl: false,
	pauseOnFocusLoss: true,
	draggable: true,
	pauseOnHover: true
}

ReactDOM.render(
	<Provider store={store} >
		<App />
		<ToastContainer {...options} />
	</Provider>,
	document.getElementById("root")
);
