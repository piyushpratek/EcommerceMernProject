import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Header from "./component/layout/Header/Header.tsx"
import webFont from "webfontloader"
import React, { useState } from 'react';
import Footer from './component/layout/Footer/Footer.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home.tsx';
import ProductDetails from './component/Product/ProductDetails.tsx';
import Products from './component/Product/Products.tsx';
import Search from './component/Product/Search.tsx';
import "./App.css"
import LoginSignUp from './component/User/LoginSignUp.tsx';
import store, { useAppDispatch, useAppSelector } from './store/store.ts';
import { loadUser } from './store/actionsHelpers/userActionHelpers.tsx';
import UserOptions from './component/layout/Header/UserOptions.tsx';
import Profile from './component/User/Profile.tsx';
import ProtectedRoute from './component/Route/ProtectedRoute.tsx';
import UpdateProfile from './component/User/UpdateProfile.tsx';
import UpdatePassword from './component/User/UpdatePassword.tsx';
import ForgotPassword from './component/User/ForgotPassword.tsx';
import ResetPassword from './component/User/ResetPassword.tsx';
import Cart from './component/Cart/Cart.tsx';
import Shipping from './component/Cart/Shipping.tsx';
import { Alert, Snackbar } from '@mui/material';
import { clearAlertMessage } from './store/slice/userSlice.tsx';
import ConfirmOrder from './component/Cart/ConfirmOrder.tsx';
import axios from 'axios';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './component/Cart/Payment.tsx';
import OrderSuccess from './component/Cart/OrderSuccess.tsx';
import MyOrders from './component/Order/MyOrders.tsx';
import OrderDetails from './component/Order/OrderDetails.tsx';

const App = () => {
  const { isAuthenticated, user, alertMessage } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const rx = useAppSelector((state) => state);
  Object.assign(window, { rx });
  Object.assign(window, { rxs: JSON.stringify(rx) });

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser())
    getStripeApiKey()
  }, [])

  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/search" element={<Search />} />

        <Route path="/account" element={
          <ProtectedRoute isAdminOnlyRoute={false} >
            <Profile />
          </ProtectedRoute>
        }
        />

        <Route path="/me/update" element={
          <ProtectedRoute isAdminOnlyRoute={false} >
            <UpdateProfile />
          </ProtectedRoute>
        }
        />

        <Route path="/password/update" element={
          <ProtectedRoute isAdminOnlyRoute={false} >
            <UpdatePassword />
          </ProtectedRoute>
        }
        />

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/login" element={<LoginSignUp />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/shipping" element={
          <ProtectedRoute isAdminOnlyRoute={false} >
            <Shipping />
          </ProtectedRoute>
        }
        />

        <Route path="/order/confirm" element={
          <ProtectedRoute isAdminOnlyRoute={false} >
            <ConfirmOrder />
          </ProtectedRoute>
        }
        />

        {stripeApiKey &&
          (
            <Route path="/process/payment" element={
              <ProtectedRoute isAdminOnlyRoute={false} >
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
            />
          )}

        <Route path="/success" element={
          <ProtectedRoute isAdminOnlyRoute={false} >
            <OrderSuccess />
          </ProtectedRoute>
        }
        />

        <Route path="/orders" element={
          <ProtectedRoute isAdminOnlyRoute={false} >
            <MyOrders />
          </ProtectedRoute>
        }
        />

        <Route path="/order/:id" element={
          <ProtectedRoute isAdminOnlyRoute={false} >
            <OrderDetails />
          </ProtectedRoute>
        }
        />

      </Routes >

      <Snackbar open={Boolean(alertMessage.message)} autoHideDuration={6_000} onClose={() => dispatch(clearAlertMessage())}>
        <Alert
          onClose={() => dispatch(clearAlertMessage())}
          severity={alertMessage.severity}
          sx={{
            position: "fixed",
            top: "90vh",
            left: "90px",
            // width: "25vw",
          }}

        >
          {alertMessage.message}
        </Alert >
      </Snackbar>
      <Footer />
    </>
  )
}

export default App
