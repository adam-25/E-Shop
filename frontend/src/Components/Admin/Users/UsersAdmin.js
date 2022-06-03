/*
	Date: June 2, 2022
		* Created Component for admin to view Users.
*/

// Importing necessary modules.
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';

// Importing Icons.
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirm } from 'react-confirm-box';

// Importing necessary components.
import MetaData from '../../Layout/MetaData';
import Heading from '../../Layout/Heading/Heading';
import Loading from '../../Loading/Loading';
import { clearErrors as userClearError } from '../../../Actions/userAction';
import SideBar from '../Layout/SideBar';
import { adminAllUsers, adminDeleteUser, clearErrors } from '../../../Actions/Admin/adminUsersAction';

const UsersAdmin = () => {

	const history = useHistory();
	const dispatch = useDispatch();

	const { user, isAuthenticateUser, loading, error } = useSelector(state => state.user);
	const { users, loading: allUserLoading, error: allUserError } = useSelector(state => state.adminUsers);

	// Delete User by admin.
	const deleteUserID = async (id) => {
		// Popup window to show delete or not.
		const result = await confirm(<div><h3>Are you sure? </h3> <br /> <p> You want to delete this User? </p></div>);

		// If yes then dispatch the action to delete an ite and reload the page.
		if (result) {
			await dispatch(adminDeleteUser(id));
			window.location.reload();
			return;
		}
		else
			return;
	}

	// Columns of the table DataGrid.
	// Columns of table with id of link.
	const columns = [
		{
			field: "id",
			headerName: "ID",
			minWidth: 300,
			maxWidth: 300,
			renderCell: (params) => {
				return <Link to={`/admin/user/view/${params.value}`}>{params.value}</Link>
			}
		},
		{
			// Status in green or in red color.
			field: "FirstName",
			headerName: "First Name",
			minWidth: 210,
			maxWidth: 210
		},
		{
			field: "LastName",
			headerName: "Last Name",
			minWidth: 210,
			maxWidth: 210,
		},
		{
			field: "email",
			headerName: "Email",
			minWidth: 300,
			maxWidth: 300
		},
		{
			field: "Role",
			headerName: "User Role",
			minWidth: 180,
			maxWidth: 180,
			cellClassName: (params) => {
				if (params.value === 'admin')
					return 'green-color';
				else if (params.value === 'user')
					return 'red-color'
			}
		},
		{
			field: "Actions",
			headerName: "Actions",
			minWidth: 150,
			maxWidth: 150,
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<Fragment>
						{/* Edit Button with link to the id of the product. */}
						<Link to={"/admin/user/view/" + params.getValue(params.id, "id")}>
							<EditIcon />
						</Link>
						{/* Delete Button. */}
						<Button>
							<DeleteIcon onClick={(() => deleteUserID(params.getValue(params.id, "id")))} />
						</Button>
					</Fragment>
				)
			}
		}
	]
	const rows = [];

	users && users.forEach(userInfo => {
		rows.push({
			id: userInfo._id,
			FirstName: userInfo.userFirstName,
			LastName: userInfo.userLastName,
			email: userInfo.userEmail,
			Role: userInfo.userRole
		})
	});

	useEffect(() => {

		// If admin is not logged in then redirect to login page.
		if (!loading)
			if (isAuthenticateUser === false)
				history.push('/login');

		// If user is not admin then cannot access all users info.
		if (!loading)
			if (isAuthenticateUser === true)
				if (user.userRole !== 'admin') {
					history.push('/');
					toast("Error: Cannot Access this Resource...")
				}

		if (allUserError) {
			toast("Error: " + allUserError);
			dispatch(clearErrors());
		}

		if (error) {
			toast("Error: " + error);
			dispatch(userClearError());
		}

		dispatch(adminAllUsers());

	}, [loading, history, isAuthenticateUser, user, dispatch, error, allUserError]);

	return (
		<Fragment>
			{loading || allUserLoading ? <Loading /> : <Fragment>
				{/* Title of the page. */}
				<MetaData title="All Users -- ADMIN" />
				{/* SideBar */}
				<SideBar />
				{/* Heading Of the page. */}
				<Heading props="All Users..." />
				{/* DataGrid Table */}
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={10}
					disableSelectionOnClick
					autoHeight
					className='products-admin-grid'
				/>
			</Fragment>}
		</Fragment>
	)
}

export default UsersAdmin