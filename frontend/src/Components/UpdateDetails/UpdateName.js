import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Update.css';


// Importing Components.
import Loading from '../Loading/Loading';
import MetaData from '../Layout/MetaData';
import { useHistory } from 'react-router-dom';
import { clearErrors, updateName } from '../../Actions/profileActions';
import { toast } from 'react-toastify';
import { loadUser } from '../../Actions/userAction';
import { UPDATE_NAME_RESET } from '../../Constants/profileConstants';

const UpdateName = () => {

	const dispatch = useDispatch();
	const history = useHistory();

	const { loading, isAuthenticateUser } = useSelector(state => state.user);
	const { isUpdate, error } = useSelector((state) => state.profile);

	const [newFullName, setNewFullName] = useState("");

	const changeNameSubmit = (e) => {
		e.preventDefault();
		dispatch(updateName(newFullName));
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
			toast("Name Updated Successfully");
			dispatch(loadUser());
			history.push("/account");

			dispatch({ type: UPDATE_NAME_RESET });
		}


	}, [loading, history, isAuthenticateUser, isUpdate, dispatch, error]);
	return (
		<Fragment>
			{loading ? <Loading /> : <Fragment>
				<MetaData title="Edit name" />
				<div className="name-change-container">
					<div className="name-info-container">
						<div>
							<h3>Change Your Name</h3>
						</div>
						<div>
							<p>If you want to change the name associated with your E-Shop account,
								you may do so below. Be sure to click the Save Changes button when you are done.</p>
							<h5>New Name</h5>

							<form className="name-change-button" onSubmit={changeNameSubmit}>
								<input type="text" className='new-name-input' required onChange={(e) => setNewFullName(e.target.value)} />
								<button type='submit'>Save Changes</button>
							</form>
						</div>
					</div>
				</div>
			</Fragment>}
		</Fragment>
	)
}

export default UpdateName;