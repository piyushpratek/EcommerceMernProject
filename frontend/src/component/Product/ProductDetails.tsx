import { Fragment, useEffect } from 'react';
import './ProductDetails.css';
import { useSelector } from 'react-redux';
import { getProductDetails } from '../../store/actionsHelper/productAction';
import { RootState, useAppDispatch } from '../../store/store';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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

  if (!product) {
    // Product details are still loading or not available
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <div className='ProductDetails'>
        <div>

        </div>
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
        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>

        </div>


      </div>

    </Fragment>
  );
};

export default ProductDetails;
