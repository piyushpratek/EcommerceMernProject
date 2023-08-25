import { Fragment, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './productList.css';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setAlertMessage } from '../../store/slice/userSlice';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from './Sidebar';
import { getAdminProduct, deleteProduct, clearAllErrors } from '../../store/actionsHelpers/productActionHelpers';
import { deleteProductReset } from '../../store/slice/Products/updateDeleteProductSlice';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, products } = useAppSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useAppSelector(
    (state) => state.updatedeleteproduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
          message: 'Product Deleted Successfully',
          severity: 'success',
        })
      );
      navigate('/admin/dashboard');
      dispatch(deleteProductReset());
    }

    dispatch(getAdminProduct());

  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5 },

    {
      field: 'name',
      headerName: 'Name',
      minWidth: 350,
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: 'price',
      headerName: 'Price',
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
            <Link to={`/admin/product/${params.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params?.id)
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
    Stock: number;
    price: string;
    name: string;
  }

  const rows: Row[] = [];

  if (Array.isArray(products)) {
    products.forEach((item) => {
      rows.push({
        id: item._id,
        Stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });
  }

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className='dashboard'>
        <SideBar />
        <div className='productListContainer'>
          <h1 id='productListHeading'>ALL PRODUCTS</h1>

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

export default ProductList;
