import { Fragment, useEffect } from 'react';
import './ProductDetails.css';
import { useSelector } from 'react-redux';
import { getProductDetails } from '../../store/actionsHelper/productAction';
import { RootState, useAppDispatch } from '../../store/store';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Rating } from '@mui/material';
import ReviewCard from './ReviewCard';
// import { Rating } from '@mui/material';

const ProductDetails = () => {
  const dispatch = useAppDispatch()
  const params = useParams()

  const productDetails = useSelector(
    (state: RootState) => state.productDetails
  );
  const { product } = productDetails

  useEffect(() => {
    if (params.id) {
      dispatch(getProductDetails(params.id));
    }
  }, [dispatch, params.id]);

  // const options = {
  //   size: "large",
  //   value: product?.ratings,
  //   readOnly: true,
  //   precision: 0.5,
  // };
  const options = {
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  }

  if (!product) {
    // Product details are still loading or not available
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
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
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <div className='detailsBlock-3'>
            <h1>{`₹${product.price}`}</h1>
            <div className='detailsBlock-3-1'>
              <div className='detailsBlock-3-1-1'>
                <button>-</button>
                <input value="1" type='number' />
                <button>+</button>
              </div >{" "}
              <button>Add to Cart</button>
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
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <p className='noReviews'>No Reviews Yet</p>
      )}
    </Fragment>

  )
};

export default ProductDetails;
