/*
	Date: May 13, 2022
		* PreHeader Component which is NavBar..
*/

// Importing Logo for NavBar and it's CSS file.
import React, { useState } from 'react'
import logo from '../../../Images/logo.png';
import './preHeaderStyles.css';

// Importing to redirect for searching items.
import { useHistory } from "react-router-dom";

const PreHeader = () => {

	let history = useHistory();

	const [searchWords, setSearchWords] = useState("");

	const searchSubmitHandler = (event) => {
		event.preventDefault();

		console.log(searchWords);

		if (searchWords.trim()) {
			history.push("/products/" + searchWords.trim());
		}
		else
			history.push("/products/");
	}

	return (
		<section className="navBar">
			{/* NavBar Logo and Search Items */}
			<nav className="navbar navbar-expand-lg navbar-dark">
				<a className="navbar-brand" href="/"><img className="logo-nav" src={logo} alt="Logo" /></a>
				<a className="nav-link products-nav" href="/products"> Products </a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* NavBar three links */}
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<form className="navbar-brand search-nav" onSubmit={searchSubmitHandler}>
						<input 
						className="search-field-nav" type="text" placeholder="Search..." autoComplete='off'
						name="search"
						onChange={(event) => setSearchWords(event.target.value)} />
						<button className="btn btn-warning search-btn-nav" type="submit"><i className="fa fa-search"></i></button>
					</form>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item sign-nav">
							<a className="nav-link" href="/login"><span className="sign-in-nav"> Sign-In & </span><br /> <span className="register-nav"> Register </span></a>
						</li>
						<li className="nav-item">
							<a className="nav-link order-nav" href="/myOrders"><span className='order-nav'><i class="fas fa-shopping-bag"></i>  Orders</span></a>
						</li>
						<li className="nav-item">
							<a className="nav-link cart-nav" href="/cart"><span className='cart-nav'><i className="fas fa-shopping-cart"></i>  Cart </span></a>
						</li>
					</ul>
				</div>
			</nav >
		</section>
	)
}

export default PreHeader;