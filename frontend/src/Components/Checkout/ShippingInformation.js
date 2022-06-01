/*	
	Date: May 25, 2022
		* Checkout Component which take, store information of shipping details.

	Date: May 26, 2022
		* Send shipping information and redirect to review order page.
*/

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// For country and State.
import { Country, State } from 'country-state-city';
import { toast } from 'react-toastify';

// Importing Required Components.
import MetaData from '../Layout/MetaData';
import Loading from '../Loading/Loading';
import CheckoutSteps from "../Layout/CheckoutStatus/CheckoutSteps.js";
import { saveShippingInfo } from '../../Actions/cartActions';
import './ShippingInformation.css';

// Required Icons in Shipping Information page.
import AbcIcon from '@mui/icons-material/Abc';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import PinDropIcon from '@mui/icons-material/PinDrop';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';

// CheckoutComponent.
const Checkout = () => {

	const history = useHistory();
	const dispatch = useDispatch();

	// Getting Cart Items, User and Shipping Information.
	const { loading, isAuthenticateUser, user } = useSelector(state => state.user);
	const { shippingInfo, cartItems } = useSelector(state => state.cart);

	// Setting User name, and all shipping information initially when page is render from localStorage.
	const [takeDeliveryFirstName, setFirstName] = useState(shippingInfo.userFirstName);
	const [takeDeliveryLastName, setLastName] = useState(shippingInfo.userLastName);
	const [addressToShip, setShippingAddress] = useState(shippingInfo.address);
	const [cityToShip, setShippingCity] = useState(shippingInfo.city);
	const [stateToShip, setShippingState] = useState(shippingInfo.state);
	const [countryToShip, setShippingCountry] = useState(shippingInfo.country);
	const [postalCodeToShip, setShippingPostalCode] = useState(shippingInfo.postalCode);
	const [contactNo, setContactNo] = useState(shippingInfo.contactInfo)

	// function called when user wants to continue after inserting shipping information.
	const shippingInfoSubmit = (e) => {
		e.preventDefault();

		if (contactNo.length !== 10) {
			toast("Please Enter Valid Contact Number.");
			return;
		}
		dispatch(saveShippingInfo({
			takeDeliveryFirstName, 
			takeDeliveryLastName, 
			addressToShip, 
			cityToShip, 
			stateToShip, 
			countryToShip, 
			postalCodeToShip, 
			contactNo}));

		history.push("/order/reviewAndConfirm")
	}

	useEffect(() => {

		// If user is logged in and there is no item in cart then redirect to cart.
		if (!loading) {
			if (isAuthenticateUser === true) {
				if (cartItems.length === 0)
					history.push("/cart")
			}
		}

		// If user is not logged in redirect to login.
		if (!loading) {
			if (isAuthenticateUser === false) {
				history.push("/login");
			}
		}


	}, [cartItems, history, isAuthenticateUser, loading, user]);

	return (
		<Fragment>
			{loading ? <Loading /> : <Fragment>
				{/* Page title. */}
				{user && <MetaData title={user.userFirstName + "'s Shipping Details"} />}
				{/* Passing which step this is to CheckoutSteps Component */}
				<CheckoutSteps step={0} />
				<div className="Shipping-info-container">
					<div className="Shipping-info-width">
						{/* Heading of page. */}
						<h2>Shipping Information</h2>
						{/* Creating Form which user can submit with every information. */}
						<form className="shipping-info" encType='multipart/form-data' onSubmit={shippingInfoSubmit}>
							{/* First Name */}
							<div className="first-name-shipping">
								<h5> First Name: </h5>
								<AbcIcon />
								<input type="text" placeholder="First Name" required value={takeDeliveryFirstName} onChange={(event) => setFirstName(event.target.value)} />
							</div>
							{/* Last Name */}
							<div className="last-name-shipping">
								<h5> Last Name: </h5>
								<AbcIcon />
								<input type="text" placeholder="Last Name" required value={takeDeliveryLastName} onChange={(event) => setLastName(event.target.value)} />
							</div>
							{/* Contant Number */}
							<div className="contact-shipping">
								<h5> Contact No: </h5>
								<PhoneIcon />
								<input type="Number" placeholder="Contact Number" required value={contactNo} onChange={(event) => setContactNo(event.target.value)} />
							</div>
							{/* Address */}
							<div className="address-shipping">
								<h5> Address: </h5>
								<HomeIcon />
								<input type="text" placeholder="Address" required value={addressToShip} onChange={(event) => setShippingAddress(event.target.value)} />
							</div>
							{/* Country which is select. */}
							<div className="country-shipping">
								<h5> Country: </h5>
								<PublicIcon />
								<select required value={countryToShip} onChange={(event) => setShippingCountry(event.target.value)}>
									<option value="" key="">Not - Selected</option>
									{Country && Country.getAllCountries().map((country) =>
										<option value={country.isoCode} key={country.isoCode}>
											{country.name}
										</option>
									)}
								</select>
							</div>
							{/* State Only appears after selecting Country */}
							{countryToShip &&
								<div className="state-shipping">
									<h5> State: </h5>
									<TransferWithinAStationIcon />
									<select value={stateToShip} onChange={(event) => setShippingState(event.target.value)} required>
										<option value="" key="">Not - Selected</option>
										{State && State.getStatesOfCountry(countryToShip).map((state) =>
											<option value={state.isoCode} key={state.isoCode}>
												{state.name}
											</option>
										)}
									</select>
								</div>
							}
							{/* City */}
							<div className="city-shipping">
								<h5> City: </h5>
								<LocationCityIcon />
								<input type="text" placeholder="City" required value={cityToShip} onChange={(event) => setShippingCity(event.target.value)} />
							</div>

							{/* Postal Code */}
							<div className="postal-code-shipping">
								<h5> Postal Code: </h5>
								<PinDropIcon />
								<input type="text" placeholder="Postal Code" required value={postalCodeToShip} onChange={(event) => setShippingPostalCode(event.target.value)} />
							</div>

							{/* Continue to checkout button. */}
							<div className="submit-button-shipping-info">
								<button type="submit">Continue</button>
							</div>

						</form>
					</div>
				</div>
			</Fragment>
			}
		</Fragment>
	)
}

export default Checkout