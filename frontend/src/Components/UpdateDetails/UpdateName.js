import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './UpdateName.css';


// Importing Components.
import Loading from '../Loading/Loading';
import MetaData from '../Layout/MetaData';
import { useHistory } from 'react-router-dom';

const UpdateName = () => {

	const history = useHistory();
	const { loading, isAuthenticateUser } = useSelector((state) => state.user);

	useEffect(() => {
		if (!loading) {
			if (isAuthenticateUser === false) {
				history.push("/logout");
			}
		}

	}, [loading, history, isAuthenticateUser]);
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

							<div className="name-change-button">
								<input type="text" className='new-name-input' />
								<button type='button'>Save Changes</button>
							</div>
						</div>
					</div>
				</div>
			</Fragment>}
		</Fragment>
	)
}

export default UpdateName;