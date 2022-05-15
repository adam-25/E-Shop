import React from 'react'
import logo from '../../../Images/logo.png';
import '../../../Styles/preHeaderStyles.css';

const PreHeader = () => {

	return (
		<section className="navBar">
			<nav className="navbar navbar-expand-lg navbar-dark">
				<a className="navbar-brand" href="/Home"><img className="logo-nav" src={logo} alt="Logo" /></a>
				<a className="nav-link products-nav" href="/Products"> Products </a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				


				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<form className="navbar-brand search-nav" action="">
						<input className="search-field-nav" type="text" placeholder="Search..." name="search" autoComplete='off' />
						<button className="btn btn-warning search-btn-nav" type="submit"><i className="fa fa-search"></i></button>
					</form>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item sign-nav">
							<a className="nav-link" href="/Login"><span className="sign-in-nav"> Sign-In & </span><br /> <span className="register-nav"> Register </span></a>
						</li>
						<li className="nav-item">
							<a className="nav-link order-nav" href="/myOrders"><span className='order-nav'><i class="fas fa-shopping-bag"></i>  Orders</span></a>
						</li>
						<li className="nav-item">
							<a className="nav-link cart-nav" href="/Cart"><span className='cart-nav'><i className="fas fa-shopping-cart"></i>  Cart </span></a>
						</li>
					</ul>
				</div>
			</nav >
		</section>
	)
}

export default PreHeader;