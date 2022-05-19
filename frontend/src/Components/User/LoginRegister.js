import React, { useState } from 'react';
import './LoginRegister.css';
import front from "../../Images/login-front.jpeg";
import { Link } from 'react-router-dom';

const LoginRegister = () => {

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: ""
	});

	const loginSubmit = () => {
		console.log('Login Form Submitted');
	}

	const registerSubmit = (e) => {
		e.preventDefault();

		const registerForm = new FormData();

		registerForm.set("name", user.name);
		registerForm.set("Email", user.email);
		registerForm.set("password", user.password);

		console.log('Register Form Submitted');
	}

	const changeUserDetail = (e) => {
		setUser({...user, [e.target.name]: e.target.value});
	}

	return (
		<div className="login-register">
			<div class="container">
				<input type="checkbox" id="flip" />
				<div class="cover">
					<div class="front">
						<img src={front} alt="Login" />
					</div>
				</div>
				<div class="forms">
					<div class="form-content">
						<div class="login-form">
							<div class="title">Login</div>
							<form onSubmit={loginSubmit}>
								<div class="input-boxes">
									<div class="input-box">
										<i class="fas fa-envelope"></i>
										<input type="email"
											placeholder="Enter your email"
											required
											value={loginEmail}
											onChange={(e) => setLoginEmail(e.target.value)} />
									</div>
									<div class="input-box">
										<i class="fas fa-lock"></i>
										<input type="password"
											placeholder="Enter your password"
											required
											value={loginPassword}
											onChange={(e) => setLoginPassword(e.target.value)} />
									</div>
									<div class="text">
										<Link to="/password/forgotPassword">Forgot password?</Link>
									</div>
									<div class="button input-box">
										<input type="submit" value="Log In" />
									</div>
									<div class="text sign-up-text">Don't have an account? <label for="flip">Sigup now</label></div>
								</div>
							</form>
						</div>
						<div class="signup-form">
							<div class="title">Signup</div>
							<form onSubmit={registerSubmit}>
								<div class="input-boxes">
									<div class="input-box">
										<i class="fas fa-user"></i>
										<input type="text" 
										placeholder="Enter your name" 
										required 
										name='name'
										value={user.name}
										onChange={changeUserDetail}/>
									</div>
									<div class="input-box">
										<i class="fas fa-envelope"></i>
										<input type="email" 
										placeholder="Enter your email" 
										required 
										name='email'
										value={user.email}
										onChange={changeUserDetail}/>
									</div>
									<div class="input-box">
										<i class="fas fa-lock"></i>
										<input type="password" 
										placeholder="Enter your password" 
										required
										name='password'
										value={user.password}
										onChange={changeUserDetail}
										/>
									</div>
									<div class="button input-box">
										<input type="submit" 
										value="Register" />
									</div>
									<div class="text sign-up-text">Already have an account? <label for="flip">Login now</label></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginRegister