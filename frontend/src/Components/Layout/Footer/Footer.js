/*
	Date: May 13, 2022
		* Footer Component.
*/

// Importing CSS
import React from 'react';
import './footerStyles.css';

// Importing Images of Footer.
import IOSApp from '../../../Images/appStoreDownload.png';
import androidApp from '../../../Images/playStoreDownload.png';
import logo from '../../../Images/logo.png';


const Footer = () => {
	return (
		<section id="foo">
			<div className="row">
				{/* First Part */}
				<div className="col-lg-4 col-md-6">
					<div className="footer">
						<h3>Download Our App for IOS and Android</h3>
						{/* eslint-disable-next-line */}
						<a href="https://www.apple.com/ca/app-store/" target="_blank"><img className="ios" src={IOSApp} alt="Download IOS App" /></a>
						{/* eslint-disable-next-line */}
						<a href="https://play.google.com/store" target="_blank"><img className="android" src={androidApp} alt="Download Android App" /></a>
					</div>
				</div>
				{/* Second Part */}
				<div className="col-lg-4 col-md-6">
					<div className="footer">
						<a href="/"><img className="logo-footer" src={logo} alt="Web-site logo" /></a>
						<p>Copyright 2022 &copy; E-Shop</p>
					</div>
				</div>
				{/* Third Part */}
				<div className="col-lg-4 col-md-12">
					<div className="footer">
						<h3 className='footer-contact'>CONTACT US</h3>
						{/* eslint-disable-next-line */}
						<a href="https://www.youtube.com/channel/UCqopxIRqpOAa0hpcXP7ngMA" target="_blank"><i class="fab fa-youtube fa-lg icon-footer"></i></a>
						{/* eslint-disable-next-line */}
						<a href="https://www.instagram.com/adarsh_11_/" target="_blank"><i class="fab fa-instagram fa-lg icon-footer"></i></a>
						{/* eslint-disable-next-line */}
						<a href="https://twitter.com/Adarsh_Dudhat" target="_blank"><i class="fab fa-twitter fa-lg icon-footer"></i></a>
						{/* eslint-disable-next-line */}
						<a href="https://www.linkedin.com/in/adarsh-dudhat/" target="_blank"><i class="fab fa-linkedin fa-lg icon-footer"></i></a>
					</div>
				</div>
			</div>

		</section>
	)
}

export default Footer