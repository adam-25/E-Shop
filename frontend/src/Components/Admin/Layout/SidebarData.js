/*
	Date: May 31, 2022
		* SideBar Data.
*/

import React from 'react';

// Icons of each data.
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import PersonIcon from '@mui/icons-material/Person';
import PreviewIcon from '@mui/icons-material/Preview';

// Data array to map though in SideBar.
export const SideBarData = [
	{
		title: 'Dashboard',
		path: '/dashboard',
		icon: <DashboardIcon />,
		className: "nav-text"
	},
	{
		title: 'Products',
		path: '/admin/products',
		icon: <InventoryIcon />,
		className: "nav-text"
	},
	{
		title: 'Create Product',
		path: '/admin/newProduct',
		icon: <AddIcon />,
		className: "nav-text"
	},
	{
		title: 'Orders',
		path: '/admin/orders',
		icon: <LocalGroceryStoreIcon />,
		className: "nav-text"
	},
	{
		title: 'Users',
		path: '/admin/users',
		icon: <PersonIcon />,
		className: "nav-text"
	},
	{
		title: 'Reviews',
		path: '/admin/reviews',
		icon: <PreviewIcon />,
		className: "nav-text"
	}
]