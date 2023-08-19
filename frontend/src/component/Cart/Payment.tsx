import { Fragment, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps.tsx';
import MetaData from '../layout/MetaData.tsx';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { createOrder, clearAllErrors } from '../../store/actionsHelpers/orderActionHelpers.tsx';
import './payment.css';
import { setAlertMessage } from '../../store/slice/userSlice.tsx';
import { ErrorResponse } from '../../store/actionsHelpers/userActionHelpers.tsx';

const Payment = () => {
  const navigate = useNavigate()
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo') || '{}');

  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef<HTMLButtonElement | null>(null);

  const { shippingInfo, cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const { error } = useAppSelector((state) => state.order);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    paymentInfo: null as any
  };

  console.log('order value?', order);
  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (payBtn.current) {
      payBtn.current.disabled = true;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/v1/payment/process',
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement) as any,
          billing_details: {
            name: user?.name,
            email: user?.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        if (payBtn.current) {
          payBtn.current.disabled = false;
        }
        dispatch(setAlertMessage({ message: result.error.message || "Error Occurred", severity: "error" }))
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate('/success');
        } else {
          dispatch(setAlertMessage({ message: "There's some issue while processing payment", severity: "error" }))
        }
      }
    } catch (error) {
      if (payBtn.current) {
        payBtn.current.disabled = false;
      }
      const axiosError = error as AxiosError<ErrorResponse>;
      const message = axiosError?.response?.data?.message || "Error Occurred";
      dispatch(setAlertMessage({ message: message, severity: "error" }))
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(setAlertMessage({ message: error, severity: "error" }))
      dispatch(clearAllErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title='Payment' />
      <CheckoutSteps activeStep={2} />
      <div className='paymentContainer'>
        <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className='paymentInput' />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className='paymentInput' />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className='paymentInput' />
          </div>

          <input
            type='submit'
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn as any}
            className='paymentFormBtn'
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
