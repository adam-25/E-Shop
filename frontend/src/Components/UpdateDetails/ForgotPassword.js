import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Update.css';


// Importing Components.
import Loading from '../Loading/Loading';
import MetaData from '../Layout/MetaData';
import { clearErrors, forgotPassword } from '../../Actions/forgotPasswordAction';
import { toast } from 'react-toastify';

const UpdateEmail = () => {

	const dispatch = useDispatch();

	const { message, error, loadingProfile } = useSelector((state) => state.forgotPassword);

	const [userEmail, setEmail] = useState("");

	const sentEmail = (e) => {
		e.preventDefault();
		dispatch(forgotPassword(userEmail));
	}

	useEffect(() => {
		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		if (message) {
			toast(message);
		}


	}, [dispatch, message, error]);
	return (
		<Fragment>
			{loadingProfile ? <Loading /> : <Fragment>
				<MetaData title="Enter Email..." />
				<div className="name-change-container">
					<div className="name-info-container">
						<div>
							<h3>Enter Your Email</h3>
						</div>
						<div>
							<p>If you forgot the password associated with your E-Shop account,
								you reset it by providing your Email registered with E-Shop. Be sure to click Submit button when you are done.</p>
							<h5>Your Email</h5>

							<form className="name-change-button" onSubmit={sentEmail}>
								<input type="email" className='new-name-input' onChange={(e) => setEmail(e.target.value)}/>
								<button type='submit'>Save Changes</button>
							</form>
						</div>
					</div>
				</div>
			</Fragment>}
		</Fragment>
	)
}

export default UpdateEmail