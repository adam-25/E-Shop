/* 
	Date: May 20, 2022
		* UserOptions Component appears when user logged in.

*/

// Importing React and Fragment.
import React, { Fragment } from 'react';

// Importing SpeedDial for Options and it's icons.
import { styled } from '@mui/material/styles';

// SpeedDial Imports
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
// Icons Imports.
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Other imports of methods and errors toast.
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, clearErrors } from '../../../Actions/userAction';
import { toast } from 'react-toastify';

// Style of the UserOption.
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
	position: 'absolute',
	'&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	'&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
		top: theme.spacing(2),
		left: theme.spacing(2),
	},
}));

// UserOption Component.
const UserOptions = () => {

	// Get cart Items Array to show how many items in cart.
	const { cartItems } = useSelector(state => state.cart);
	const dispatch = useDispatch();
	let history = useHistory();

	// Getting User to check it's role.
	const { error, user } = useSelector(state => state.user);

	// Array of option icons and the function that will be called when the user clicked.
	const actions = [
		{ icon: <AccountCircleIcon />, name: 'Account', func: account },
		{ icon: <ShoppingCartIcon />, name:  `ShoppingCart (${cartItems.length})`, func: cart },
		{ icon: <LogoutIcon />, name: 'LogOut', func: logout },
	];

	// Check if user is an admin or not.
	// If User is an admin then, dashboard option will come as well.
	if (user.userRole === "admin")
		actions.unshift({ icon: <DashboardIcon />, name: 'DashBoard', func: dashboard });

	// Redirect to dashboard.
	function dashboard() {
		history.push("/dashboard");
	}

	// Redirect to account.
	function account() {
		history.push("/account");
	}

	// Redirect to cart.
	function cart() {
		history.push("/cart");
	}

	// LogOut user.
	function logout() {
		// Dispatch logout user.
		dispatch(logoutUser());
		if (error)
		{
			toast("Error", error);
			dispatch(clearErrors());
		}
		
		toast("Log out Successfully");
	}

	return (
		<Fragment>
			<Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
				<Box sx={{ position: 'relative', marginTop: "-190px", marginRight: "4%", zIndex: 5, height: 320, color: "red" }}>
					<StyledSpeedDial
						ariaLabel="SpeedDial playground example"
						icon={<SpeedDialIcon />}
						direction="left"
					>
						{/* SpeedDial Items. */}
						{actions.map((action) => (
							<SpeedDialAction
								key={action.name}
								icon={action.icon}
								tooltipTitle={action.name}
								// Call Function on click when user clicks on one of the options.
								onClick={action.func}
							/>
						))}
					</StyledSpeedDial>
				</Box>
			</Box>
		</Fragment>
	)
}

export default UserOptions