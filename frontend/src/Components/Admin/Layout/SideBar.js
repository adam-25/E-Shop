/*
	Date: May 31, 2022
		* Create Layout of SideBar.
*/

// Importing necessary modules.
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Importing necessary components.
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { SideBarData } from './SidebarData';
import './sidebar.css';

const SideBar = () => {

	// Set Sidebar open and close.
	const [sidebar, setSidebar] = React.useState(false);

	// Toggle Sidebar open and close.
	const showSidebar = () => {
		setSidebar(!sidebar);
	}

	return (
		<Fragment>
			{/* Bar Icon of sidebar. */}
			<div className='navbar-menu-icon-dashboard'>
				<Link to='#' className='menu-bars'>
					<MenuIcon onClick={showSidebar} />
				</Link>
			</div>

			{/* Value in sidebar. */}
			<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
				{/* UnOrder list to store all sidebar items. */}
				<ul className='nav-menu-items' onClick={showSidebar}>
					{/* Close Icon Button of Sidebar. */}
					<li className='navbar-toggle-item'>
						<Link to='#' className='menu-bars'>
							<CloseIcon />
						</Link>
					</li>
					{/* Sidebar Data with links. */}
					{SideBarData.map((item, index) => {
						return (
							<li key={index} className={item.className}>
								<Link to={item.path}>
									{item.icon}
									<span>{item.title}</span>
								</Link>
							</li>
						)
					})}
				</ul>
			</nav>
		</Fragment>
	)
}

export default SideBar