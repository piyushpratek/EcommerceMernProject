import { Fragment, useEffect } from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import './productList.css';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { setAlertMessage } from '../../store/slice/userSlice';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from './Sidebar';
import {
  getAllUsers,
  clearAllErrors,
  deleteUser,
} from '../../store/actionsHelpers/userActionHelpers';
// import { deleteUserReset } from '../../store/slice/userSlice';

const UsersList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, users } = useAppSelector((state) => state.allUsers);
  console.log("users?", users)

  const { error: deleteError } = useAppSelector((state) => state.user);

  const deleteUserHandler = (id: string | any) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(setAlertMessage({ message: error, severity: 'error' }));
      dispatch(clearAllErrors());
    }

    if (deleteError) {
      dispatch(setAlertMessage({ message: deleteError, severity: 'error' }));
      dispatch(clearAllErrors());
    }
    //TODO = add deleteUserReset
    // if (isDeleted) {
    //   dispatch(setAlertMessage({ message: message || 'User deleted successfully.', severity: 'success' }));
    //   navigate('/admin/users');
    //   dispatch(deleteUserReset());
    // }
    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, navigate]);

  const getStatusCellClassName = (params: GridCellParams) => {
    return params?.id === 'admin' ? 'greenColor' : 'redColor';
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'User ID', minWidth: 180, flex: 0.8 },

    {
      field: 'email',
      headerName: 'Email',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: 'role',
      headerName: 'Role',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
      cellClassName: getStatusCellClassName
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params?.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params?.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  interface Row {
    id: string;
    role: string;
    email: string;
    name: string;
  }

  const rows: Row[] = [];

  users?.forEach((item) => {
    rows.push({
      id: item?._id,
      role: item?.role,
      email: item?.email,
      name: item?.name,
    });
  });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className='dashboard'>
        <SideBar />
        <div className='productListContainer'>
          <h1 id='productListHeading'>ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            autoPageSize={false}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            className='productListTable'
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
