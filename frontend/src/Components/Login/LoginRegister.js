/*	
	Date: May 19, 2022
		* Creating Login Page.
*/

// Importing necessary modules and images.
import React, { useState, useEffect, Fragment } from 'react';
import front from "../../Images/login-front.jpeg";

// toast for errors, useHistory for redirecting and useSelector and useDispatch to dispatch and get data.
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Importing functions required user to login, register and ...
import { loginUser, clearErrors, registerUser } from '../../Actions/userAction';

// Importing necessary Components.
import Loading from "../Loading/Loading";
import MetaData from '../Layout/MetaData';
import './LoginRegister.css';

// LoginOrRegister User Component.
const LoginRegister = () => {

	const dispatch = useDispatch();
	const history = useHistory();

	// Fetch user data from store.
	const { loading, error, isAuthenticateUser } = useSelector(state => state.user)

	// Set Login password and email when user enter in Input.
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	// Register user with name, email and password.
	const [registerName, setRegisterName] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");

	useEffect(() => {
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		// If User is logged in then redirect to "/account"
		if (isAuthenticateUser) {
			toast("LogIn / Register Successfully");
			history.push("/account");
		}

	}, [dispatch, error, isAuthenticateUser, history]);

	// If User click on Login Submit button then dispatch loginUser method in action.
	const loginSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser(loginEmail, loginPassword));
	}

	// If User clicked on Register button then dispatch registerUser method in action.
	const registerSubmit = (e) => {
		e.preventDefault();
		dispatch(registerUser(registerName, registerEmail, registerPassword));
	}

	return (
		<Fragment>
			{loading ? <Loading /> :
				<div className="login-register">
					{/* Give Login title to page. */}
					<MetaData title="Login..." />
					<div class="container">
						<input type="checkbox" id="flip" />
						<div class="cover">
							{/* Image */}
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
											{/* Getting Email and Password of User and set it with useState.. */}
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
											{/* Forgot Password link. */}
											<div class="text">
												<a href="/password/forgotPassword">Forgot password?</a>
											</div>
											<div class="button input-box">
												<input type="submit" value="Log In" />
											</div>
											{/* Switch to sign up page. */}
											<div class="text sign-up-text">Don't have an account? <label for="flip">SignUp now</label></div>
										</div>
									</form>
								</div>
								{/* SignUp Page. */}
								<div class="signup-form">
									<div class="title">Signup</div>
									<form onSubmit={registerSubmit}>
										{/* Get User name, email and password and set it with useState. */}
										<div class="input-boxes">
											<div class="input-box">
												<i class="fas fa-user"></i>
												<input type="text"
													placeholder="Enter your name"
													required
													name='name'
													value={registerName}
													onChange={(e) => setRegisterName(e.target.value)} />
											</div>
											<div class="input-box">
												<i class="fas fa-envelope"></i>
												<input type="email"
													placeholder="Enter your email"
													required
													name='email'
													value={registerEmail}
													onChange={(e) => setRegisterEmail(e.target.value)} />
											</div>
											<div class="input-box">
												<i class="fas fa-lock"></i>
												<input type="password"
													placeholder="Enter your password"
													required
													name='password'
													value={registerPassword}
													onChange={(e) => setRegisterPassword(e.target.value)}
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
			}
		</Fragment>
	)
}

export default LoginRegister