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
  console.log("product.name?", product?.name);

  console.log('Images:?', product?.images);
  console.log("params.id?", params.id);

  if (!product) {
    // Product details are still loading or not available
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <div className='ProductDetails'>
        <div>
          {product.images && product.images.length > 0 ? (
            <Carousel>
              {product.images.map((item, i) => (
                <img
                  key={i}
                  src={item.url}
                  alt={`Slide ${i + 1}`}
                />
              ))}
            </Carousel>
          ) : (
            <div>No images available</div>
          )}
        </div>

        {/* Rest of the component */}

      </div>

    </Fragment>
  );
};

export default ProductDetails;
