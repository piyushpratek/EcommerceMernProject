import React, { Fragment, useEffect } from 'react';
import Carousel from '@mui/material/Carousel';
import './ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../store/actions/productAction';
import { RootState } from '../../store/store';

const ProductDetails: React.FC<{ match: { params: { id: string } } }> = ({ match }) => {
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, getProductDetails]);



  return (
    <Fragment>
      <div className='ProductDetails'>
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
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
