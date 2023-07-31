import React, { Fragment, useEffect, useState } from 'react';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearAllErrors,
  getProductDetails,
  newReview,
} from '../../store/actionsHelper/productAction';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../store/actionsHelper/cartAction';
import { newReviewReset } from '../../store/slice/productSlice';
import { RootState } from '../../store/store';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import Carousel from '@mui/material';
import { Rating } from '@mui/material';
// import ReviewCard from './ReviewCard';

const ProductDetails: React.FC<{ match: { params: { id: string } } }> = ({
  match,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const productDetails = useSelector(
    (state: RootState) => state.productDetails
  );
  const { product, loading } = productDetails;

  // const newReview = useSelector((state: RootState) => state.product.reviews);
  // const { success, error } = newReview;


  const options = {
    size: 'large',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);


  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitReviewToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set('rating', rating);
    myForm.set('comment', comment);
    myForm.set('productId', match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      setOpen(true)
      dispatch(clearAllErrors());
    }

    if (reviewError) {
      setOpen(true)
      dispatch(clearAllErrors());
    }

    if (success) {
      setOpen(true)
      dispatch(newReviewReset());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className='ProductDetails'>
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className='CarouselImage'
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className='detailsBlock-1'>
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className='detailsBlock-2'>
                {/* <Rating {...options} /> */}
                <span className='detailsBlock-2-span'>
                  {' '}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className='detailsBlock-3'>
                <h1>{`₹${product.price}`}</h1>
                <div className='detailsBlock-3-1'>
                  <div className='detailsBlock-3-1-1'>
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type='number' value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                    {product.Stock < 1 ? 'OutOfStock' : 'InStock'}
                  </b>
                </p>
              </div>

              <div className='detailsBlock-4'>
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className='submitReview'>
                Submit Review
              </button>
            </div>
          </div>

          <h3 className='reviewsHeading'>REVIEWS</h3>

          <Dialog
            aria-labelledby='simple-dialog-title'
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className='submitDialog'>
              <Rating
                onChange={(e, newValue) => setRating(newValue)}
                value={rating}
                size='large'
              />

              <textarea
                className='submitDialogTextArea'
                cols={30}
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color='secondary'>
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color='primary'>
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
              {error ? error : 'Review Submitted Successfully'}
            </Alert>
          </Snackbar>

          {product.reviews && product.reviews[0] ? (
            <div className='reviews'>
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className='noReviews'>No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
