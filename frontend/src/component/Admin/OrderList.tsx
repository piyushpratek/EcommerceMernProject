import { Fragment, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';

import './productList.css';
import MetaData from '../layout/MetaData';
import SideBar from './Sidebar';
import { setAlertMessage } from '../../store/slice/userSlice';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  deleteOrder,
  getAllOrders,
  clearAllErrors,
} from '../../store/actionsHelpers/orderActionHelpers';
import { deleteOrderReset } from '../../store/slice/orderSlice';

const OrderList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, orders } = useAppSelector((state) => state.order);

  const { error: deleteError, isDeleted } = useAppSelector(
    (state) => state.order
  );

  const deleteOrderHandler = (id: any) => {
    dispatch(deleteOrder(id));
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

    if (isDeleted) {
      dispatch(
        setAlertMessage({
          message: 'Order Deleted Successfully',
          severity: 'success',
        })
      );
      navigate('/admin/orders');
      dispatch(deleteOrderReset());
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  const getStatusCellClassName = (params: any): string => {
    const status = params.value as string
    return status === "Delivered" ? "greenColor" : "redColor";
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      cellClassName: getStatusCellClassName,
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/order/${params.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.id)
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
    itemsQty: number;
    amount: number;
    status: string;
  }
  const rows: Row[] = [];

  orders?.forEach((item) => {
    rows.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      amount: item.totalPrice,
      status: item.orderStatus,
    });
  });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className='dashboard'>
        <SideBar />
        <div className='productListContainer'>
          <h1 id='productListHeading'>ALL ORDERS</h1>

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

export default OrderList;
