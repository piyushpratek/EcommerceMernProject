import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Header from "./component/layout/Header/Header.tsx"
import webFont from "webfontloader"
import React from 'react';
import Footer from './component/layout/Footer/Footer.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home.tsx';
import ProductDetails from './component/Product/ProductDetails.tsx';
import Products from './component/Product/Products.tsx';
import Search from './component/Product/Search.tsx';
import "./App.css"
import LoginSignUp from './component/User/LoginSignUp.tsx';
import store, { useAppSelector } from './store/store.ts';
import { loadUser } from './store/actionsHelpers/userActionHelpers.tsx';
import UserOptions from './component/layout/Header/UserOptions.tsx';
import Profile from './component/User/Profile.tsx';
import ProtectedRoute from './component/Route/ProtectedRoute.tsx';
import UpdateProfile from './component/User/UpdateProfile.tsx';
import UpdatePassword from './component/User/UpdatePassword.tsx';
import ForgotPassword from './component/User/ForgotPassword.tsx';
import ResetPassword from './component/User/ResetPassword.tsx';

const App = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.user);

  const rx = useAppSelector((state) => state);
  Object.assign(window, { rx });
  Object.assign(window, { rxs: JSON.stringify(rx) });

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser())
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


        {/* example protected route */}
        {/* <Route path="/abcd" element={
          <ProtectedRoute isAdminOnlyRoute={false} >
            <ABCD />
          </ProtectedRoute>
        }
        /> */}

        <Route path="/login" element={<LoginSignUp />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
