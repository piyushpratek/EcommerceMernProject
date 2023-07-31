import { Fragment, useEffect } from 'react';
import './ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../store/actionsHelper/productAction';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel CSS


const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams()
  const { product } = useSelector((state: RootState) => state.productDetails);


  useEffect(() => {
    dispatch(getProductDetails(params?.id));
  }, [dispatch, params?.id]);



  return (
    <Fragment>
      <div className='ProductDetails'>
        <div>
          <Carousel>
            {product?.images &&
              product?.images?.map((item, i) => (
                <img
                  // className='legend'
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
