import { Fragment, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import './productReviews.css';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  getAllReviews,
  deleteReviews,
  clearAllErrors,
} from '../../store/actionsHelpers/productActionHelpers';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import StarsIcon from '@mui/icons-material/Stars';
import MetaData from '../layout/MetaData';
import SideBar from './Sidebar';
import { deleteReviewReset } from '../../store/slice/Products/deleteReviewSlice';
import { setAlertMessage } from '../../store/slice/user/userSlice';
import { useNavigate } from 'react-router-dom';

const ProductReviews = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useAppSelector(
    (state) => state.deletereview
  );

  const { error, reviews, loading } = useAppSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState('');

  const deleteReviewHandler = (reviewId: GridRowId) => {
    dispatch(deleteReviews(reviewId as any, productId));
  };

  const productReviewsSubmitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
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
          message: 'Review Deleted Successfully',
          severity: 'success',
        })
      );
      navigate('/admin/reviews');
      dispatch(deleteReviewReset());
    }
  }, [dispatch, error, deleteError, navigate, isDeleted, productId]);

  const getStatusCellClassName = (params): string => {
    const status = params.id as string
    return status === "rating" ? "greenColor" : "redColor";
  };
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Review ID', minWidth: 200, flex: 0.5 },

    {
      field: 'user',
      headerName: 'User',
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: 'comment',
      headerName: 'Comment',
      minWidth: 350,
      flex: 1,
    },

    {
      field: 'rating',
      headerName: 'Rating',
      type: 'number',
      minWidth: 180,
      flex: 0.4,

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
            <Button
              onClick={() =>
                deleteReviewHandler(params.id)
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
    id: string
    rating: number
    comment: string
    user: string
  }
  const rows: Row[] = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className='dashboard'>
        <SideBar />
        <div className='productReviewsContainer'>
          <form
            className='productReviewsForm'
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className='productReviewsFormHeading'>ALL REVIEWS</h1>

            <div>
              <StarsIcon />
              <input
                type='text'
                placeholder='Product Id'
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id='createProductBtn'
              type='submit'
              disabled={
                loading ? true : false || productId === '' ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews?.length > 0 ? (
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
          ) : (
            <h1 className='productReviewsFormHeading'>No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
