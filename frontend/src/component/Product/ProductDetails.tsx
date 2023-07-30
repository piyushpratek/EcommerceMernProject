import React, { Fragment, useEffect } from 'react';
import './ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../store/actionsHelper/productAction';
import { RootState } from '../../store/store';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams()
  const { product, loading, error } = useSelector((state: RootState) => state.productDetails);

  useEffect(() => {
    if (params?.id) {
      dispatch(getProductDetails(params?.id));
    }
  }, [dispatch, params?.id]);



  return (
    <Fragment>
      <div className='ProductDetails'>
        <div>
          <Carousel>
            {product?.images &&
              product?.images?.map((item, i) => (
                <img
                  className='CarouselImage'
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
        {/* Rest of the component */}
      </div>
    </Fragment>
  );
};

export default ProductDetails;
