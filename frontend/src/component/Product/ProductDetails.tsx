import { Fragment, useEffect, useState } from 'react';
import './ProductDetails.css';
import { clearAllErrors, getProductDetails, newReview } from '../../store/actionsHelpers/productActionHelpers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Rating } from '@mui/material';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../store/actionsHelpers/cartActionHelpers';
import { setAlertMessage } from '../../store/slice/user/userSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { newReviewReset } from '../../store/slice/Products/newReviewSlice';

const ProductDetails = () => {
  const dispatch = useAppDispatch()

  const params = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (quantity < product!.Stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(params.id!, quantity))
    dispatch(setAlertMessage({ message: "Item Added To Cart", severity: "success" }))
  }
  const submitReviewToggle = () => {
    // open ? setOpen(false) : setOpen(true);
    setOpen(!open)
  };

  const reviewSubmitHandler = () => {
    const reviewData = {
      rating: rating,
      comment: comment,
      productId: params.id,
    };

    dispatch(newReview(reviewData));

    setOpen(false);
  };

  const productDetails = useAppSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails
  const { success, error: reviewError } = useAppSelector((state) => state.newReview)

  useEffect(() => {
    if (error) {
      dispatch(setAlertMessage({ message: error, severity: "error" }))
      dispatch(clearAllErrors());
    }
    if (reviewError) {
      dispatch(setAlertMessage({ message: reviewError, severity: "error" }))
      dispatch(clearAllErrors())
    }
    if (success) {
      dispatch(setAlertMessage({ message: "Review Submitted Successfully", severity: "success" }))
      dispatch(newReviewReset)
    }

    if (params?.id) {
      dispatch(getProductDetails(params?.id));
    }
  }, [dispatch, params?.id, error, reviewError, success]);

  const options = {
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  }

  if (!product) {
    // Product details are still loading or not available
    return <Loader />;
  }

  return (
    <Fragment>
      <MetaData title={`${product.name} --ECOMMERCE`} />

      {loading ? <Loader /> : (<Fragment>
        <div className='ProductDetails'>
          <div>
            <Carousel>
              {product?.images?.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
            </Carousel>
          </div>

          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product # {product._id}</p>
            </div>

            <div className='detailsBlock-2'>
              <Rating {...options} />
              <span className='detailsBlock-2-span'>
                {' '}
                ({product?.numOfReviews} Reviews)
              </span>
            </div>
            <div className='detailsBlock-3'>
              <h1>{`₹${product.price}`}</h1>
              <div className='detailsBlock-3-1'>
                <div className='detailsBlock-3-1-1'>
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly value={quantity} type='number' />
                  <button onClick={increaseQuantity}>+</button>
                </div >{" "}
                <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
              </div >
              <p>
                Status:{" "}
                <b className={product?.Stock < 1 ? 'redColor' : 'greenColor'}>
                  {product?.Stock < 1 ? 'OutOfStock' : 'InStock'}
                </b>
              </p>
            </div>

            <div className='detailsBlock-4'>
              Description : <p>{product?.description}</p>
            </div>
            <button className='submitReview' onClick={submitReviewToggle}>
              Submit Review
            </button>
          </div>
        </div>

        <h3 className='reviewsHeading'>REVIEWS</h3>

        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
              value={rating}
              onChange={(_event, newValue) => {
                if (newValue !== null) {
                  setRating(newValue);
                }
              }}
              size="large"
            />

            <textarea
              className="submitDialogTextArea"
              cols={30}
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={reviewSubmitHandler} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {product?.reviews[0] ? (
          <div className='reviews'>
            {product?.reviews.map((review) => (
              <ReviewCard key={review?._id} review={review} />
            ))}
          </div>
        ) : (
          <p className='noReviews'>No Reviews Yet</p>
        )}

      </Fragment>)}
    </Fragment>

  )
};

export default ProductDetails;
