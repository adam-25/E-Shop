import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Update.css';


// Importing Components.
import Loading from '../Loading/Loading';
import MetaData from '../Layout/MetaData';
import { useHistory } from 'react-router-dom';
import { clearErrors, updatePassword } from '../../Actions/profileActions';
import { toast } from 'react-toastify';
import { loadUser } from '../../Actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../Constants/profileConstants';

const UpdatePassword = () => {

	const dispatch = useDispatch();
	const history = useHistory();

	const { loading, isAuthenticateUser } = useSelector(state => state.user);
	const { isUpdate, error } = useSelector((state) => state.profile);

	const [newPassword, setNewPassword] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const changePasswordSubmit = (e) => {
		e.preventDefault();
		dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
	}

	useEffect(() => {
		if (!loading) {
			if (isAuthenticateUser === false) {
				history.push("/logout");
			}
		}

		if (error) {
			toast("Error: " + error);
			dispatch(clearErrors());
		}

		if (isUpdate) {
			toast("Password Updated Successfully");
			dispatch(loadUser());
			history.push("/account");

			dispatch({ type: UPDATE_PASSWORD_RESET });
		}


	}, [loading, history, isAuthenticateUser, isUpdate, dispatch, error]);
	return (
		<Fragment>
			{loading ? <Loading /> : <Fragment>
				<MetaData title="Edit name" />
				<div className="name-change-container">
					<div className="name-info-container">
						<div>
							<h3>Change Your Password</h3>
						</div>
						<div>
							<p>If you want to change the Password associated with your E-Shop account,
								you may do so below. Be sure to click the Save Changes button when you are done.</p>

							<form className="name-change-button" onSubmit={changePasswordSubmit}>
								<h5>Old Password</h5>
								<input type="password" className='new-name-input' required onChange={(e) => setOldPassword(e.target.value)} />
								<h5>New Password</h5>
								<input type="password" className='new-name-input' required onChange={(e) => setNewPassword(e.target.value)} />
								<h5>Confirm Password</h5>
								<input type="password" className='new-name-input' required onChange={(e) => setConfirmPassword(e.target.value)} />
								<button type='submit'>Save Changes</button>
							</form>
						</div>
					</div>
				</div>
			</Fragment>}
		</Fragment>
	)
}

export default UpdatePassword;