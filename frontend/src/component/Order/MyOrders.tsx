import { Fragment, useEffect } from "react";
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import "./myOrders.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { Typography } from '@mui/material';
import MetaData from "../layout/MetaData";
import LaunchIcon from '@mui/icons-material/Launch';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { myOrders, clearAllErrors } from "../../store/actionsHelpers/orderActionHelpers";
import { setAlertMessage } from "../../store/slice/userSlice";

interface CustomCellParams extends GridCellParams {
  value: string;
  id: string;
}

const MyOrders = () => {
  const dispatch = useAppDispatch();
  const { loading, error, orders } = useAppSelector((state) => state.order);
  const { user } = useAppSelector((state) => state.user);

  const getStatusCellClassName = (params: CustomCellParams): string => {
    return params.value === "Delivered" ? "greenColor" : "redColor";
  };

  const renderActionsCell = (params: CustomCellParams): JSX.Element => (
    <Link to={`/order/${params.row.id}`}>
      <LaunchIcon />
    </Link>
  );

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: getStatusCellClassName
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: renderActionsCell
    },
  ];

  // interface Row {
  //   itemsQty: number;
  //   id: string;
  //   status: string;
  //   amount: number;
  // }

  const rows = orders.map((item) => ({
    itemsQty: item.orderItems.length,
    id: item._id,
    status: item.orderStatus,
    amount: item.totalPrice,
  }));
  useEffect(() => {
    if (error) {
      dispatch(setAlertMessage({ message: error, severity: "error" }))
      dispatch(clearAllErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={`${user?.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns as any}
            // pageSize={10 } 
            disableRowSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user?.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
