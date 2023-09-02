import { Fragment, useEffect, useState } from 'react';
import MetaData from '../layout/MetaData';
import { Link, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import SideBar from './Sidebar';
import {
  getOrderDetails,
  clearAllErrors,
  updateOrder,
} from '../../store/actionsHelpers/orderActionHelpers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Loader from '../layout/Loader/Loader';
import { setAlertMessage } from '../../store/slice/user/userSlice';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Button from '@mui/material/Button';
import { updateOrderReset } from '../../store/slice/orderSlice';
import './processOrder.css';

const ProcessOrder = () => {
  const params = useParams<{ id: string }>()

  const { order, error, loading, isUpdated, error: updateError } = useAppSelector(
    (state) => state.order
  );
  const [status, setStatus] = useState('');

  const updateOrderSubmitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (params?.id) {

      dispatch(updateOrder(params?.id, status));
    }
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      dispatch(setAlertMessage({ message: error, severity: 'error' }));
      dispatch(clearAllErrors());
    }
    if (updateError) {
      dispatch(setAlertMessage({ message: updateError, severity: 'error' }));
      dispatch(clearAllErrors());
    }
    if (isUpdated) {
      dispatch(
        setAlertMessage({
          message: 'Order Updated Successfully',
          severity: 'success',
        })
      );
      dispatch(updateOrderReset());
    }
    if (params?.id) {
      dispatch(getOrderDetails(params?.id));
    }
  }, [dispatch, error, params?.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title='Process Order' />
      <div className='dashboard'>
        <SideBar />
        <div className='newProductContainer'>
          {loading ? (
            <Loader />
          ) : (
            <div
              className='confirmOrderPage'
              style={{
                display: order?.orderStatus === 'Delivered' ? 'block' : 'grid',
              }}
            >
              <div>
                <div className='confirmshippingArea'>
                  <Typography>Shipping Info</Typography>
                  <div className='orderDetailsContainerBox'>
                    <div>
                      <p>Name:</p>
                      <span>{order?.user?.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order?.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {
                          `${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.state}, ${order?.shippingInfo.pinCode}, ${order?.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className='orderDetailsContainerBox'>
                    <div>
                      <p
                        className={
                          order?.paymentInfo.status === 'succeeded'
                            ? 'greenColor'
                            : 'redColor'
                        }
                      >
                        {order?.paymentInfo.status === 'succeeded'
                          ? 'PAID'
                          : 'NOT PAID'}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order?.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className='orderDetailsContainerBox'>
                    <div>
                      <p
                        className={order?.orderStatus === 'Delivered'
                          ? 'greenColor'
                          : 'redColor'
                        }
                      >
                        {order?.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='confirmCartItems'>
                  <Typography>Your Cart Items:</Typography>
                  <div className='confirmCartItemsContainer'>
                    {order?.orderItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt='Product' />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{' '}
                        <span>
                          {item.quantity} X ₹{item.price} ={' '}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order?.orderStatus === 'Delivered' ? 'none' : 'block',
                }}
              >
                <form
                  className='updateOrderForm'
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value=''>Choose Category</option>
                      {order?.orderStatus === 'Processing' && (
                        <option value='Shipped'>Shipped</option>
                      )}

                      {order?.orderStatus === 'Shipped' && (
                        <option value='Delivered'>Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id='createProductBtn'
                    type='submit'
                    disabled={
                      loading ? true : false || status === '' ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
