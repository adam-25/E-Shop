import React, { Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { logoutUser, clearErrors } from '../../../Actions/userAction';

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

const UserOptions = () => {

	const { cartItems } = useSelector(state => state.cart);
	const dispatch = useDispatch();
	let history = useHistory();

	const { error, user } = useSelector(state => state.user);

	const actions = [
		{ icon: <AccountCircleIcon />, name: 'Account', func: account },
		{ icon: <ShoppingCartIcon />, name:  `ShoppingCart (${cartItems.length})`, func: cart },
		{ icon: <LogoutIcon />, name: 'LogOut', func: logout },
	];

	if (user.userRole === "admin")
		actions.unshift({ icon: <DashboardIcon />, name: 'DashBoard', func: dashboard });

	function dashboard() {
		history.push("/dashboard");
	}

	function account() {
		history.push("/account");
	}

	function cart() {
		history.push("/cart");
	}

	function logout() {
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
						{actions.map((action) => (
							<SpeedDialAction
								key={action.name}
								icon={action.icon}
								tooltipTitle={action.name}
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