import { Fragment, useEffect, useState } from 'react';
import './ProductDetails.css';
import { clearAllErrors, getProductDetails } from '../../store/actionsHelpers/productActionHelpers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Rating } from '@mui/material';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../store/actionsHelpers/cartActionHelpers';
import { setAlertMessage } from '../../store/slice/userSlice';

const ProductDetails = () => {
  const dispatch = useAppDispatch()
  const params = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState<number>(1);

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
    dispatch(setAlertMessage({ message: "Item Added To Cart", severity: "error" }))
  }

  const productDetails = useAppSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails

  useEffect(() => {
    if (error) {
      dispatch(clearAllErrors());
    }
    //TODO
    // if (success) {
    //   alert.success("Review Submitted Successfully");
    //   dispatch({ type: NEW_REVIEW_RESET });
    // }

    if (params?.id) {
      dispatch(getProductDetails(params?.id));
    }
  }, [dispatch, params?.id, error]);

  const options = {
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  }

  if (!product) {
    // Product details are still loading or not available
    return <Loader />;
  }
  //TODO
  // dispatch(setAlertMessage({ message: "Review Submitted Successfully", severity: "success" }))
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
                <button onClick={addToCartHandler}>Add to Cart</button>
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
            <button className='submitReview'>
              Submit Review
            </button>
          </div>
        </div>

        <h3 className='reviewsHeading'>REVIEWS</h3>

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
