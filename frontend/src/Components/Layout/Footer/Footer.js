import React from 'react';
import IOSApp from '../../../Images/appStoreDownload.png';
import androidApp from '../../../Images/playStoreDownload.png';
import logo from '../../../Images/logo.png';
import '../../../Styles/footerStyles.css';

const Footer = () => {
	return (

		<section id="foo">
			<div className="row">
				<div className="col-lg-4 col-md-6">
					<div className="footer">
						<h3>Download Our App for IOS and Android</h3>
						<a href="https://www.apple.com/ca/app-store/" target="_blank"><img className="ios" src={IOSApp} alt="Download IOS App" /></a>
						<a href="https://play.google.com/store" target="_blank"><img className="android" src={androidApp} alt="Download Android App" /></a>
					</div>
				</div>
				<div className="col-lg-4 col-md-6">
					<div className="footer">
						<a href="/Home"><img className="logo-footer" src={logo} alt="Web-site logo" /></a>
						<p>Copyright 2022 &copy; E-Shop</p>
					</div>
				</div>
				<div className="col-lg-4 col-md-12">
					<div className="footer">
						<h3>CONTACT US</h3>
						<a href="https://www.youtube.com/channel/UCqopxIRqpOAa0hpcXP7ngMA" target="_blank"><i class="fab fa-youtube fa-lg icon"></i></a>
						<a href="https://www.instagram.com/adarsh_11_/" target="_blank"><i class="fab fa-instagram fa-lg icon"></i></a>
						<a href="https://twitter.com/Adarsh_Dudhat" target="_blank"><i class="fab fa-twitter fa-lg icon"></i></a>
						<a href="https://www.linkedin.com/in/adarsh-dudhat/" target="_blank"><i class="fab fa-linkedin fa-lg icon"></i></a>
					</div>
				</div>
			</div>

		</section>
	)
}

export default Footer