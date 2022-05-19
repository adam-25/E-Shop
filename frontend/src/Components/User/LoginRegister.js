import React, { useState, useEffect, Fragment } from 'react';
import './LoginRegister.css';
import front from "../../Images/login-front.jpeg";
import Loading from "../Loading/Loading";
import { Link, useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { loginUser, clearErrors } from '../../Actions/userAction';

const LoginRegister = () => {

	const dispatch = useDispatch();
	const history = useHistory();

	const { loading, error, isAuthenticateUser } = useSelector(state => state.user)

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const [userDetail, setUserDetail] = useState({
		name: "",
		email: "",
		password: ""
	});

	useEffect(() => {
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors);
		}

		if (isAuthenticateUser) {
			toast("LogIn Successfully");
			history.push("/account");
		}

	}, [dispatch, error, isAuthenticateUser, history]);


	const loginSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser(loginEmail, loginPassword));
	}

	const registerSubmit = (e) => {
		e.preventDefault();

		const registerForm = new FormData();

		registerForm.set("name", userDetail.name);
		registerForm.set("Email", userDetail.email);
		registerForm.set("password", userDetail.password);

		console.log('Register Form Submitted');
	}

	const changeUserDetail = (e) => {
		setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
	}

	return (
		<Fragment>
			{loading ? <Loading /> :
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
													value={userDetail.name}
													onChange={changeUserDetail} />
											</div>
											<div class="input-box">
												<i class="fas fa-envelope"></i>
												<input type="email"
													placeholder="Enter your email"
													required
													name='email'
													value={userDetail.email}
													onChange={changeUserDetail} />
											</div>
											<div class="input-box">
												<i class="fas fa-lock"></i>
												<input type="password"
													placeholder="Enter your password"
													required
													name='password'
													value={userDetail.password}
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
			}
		</Fragment>
	)
}

export default LoginRegister