import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
