import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

// import Header from "./component/layout/Header/Header.tsx"
import webFont from "webfontloader"
import React from 'react';
import Footer from './component/layout/Footer/Footer.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home.tsx';
import HeaderTesting from './component/layout/Header/HeaderTesting.tsx';
import ProductDetails from './component/Product/ProductDetails.tsx';
import { useSelector } from 'react-redux';
import Products from './component/Product/Products.tsx';
import Search from './component/Product/Search.tsx';

const App = () => {
  const rx = useSelector((state) => state);
  Object.assign(window, { rx });
  Object.assign(window, { rxs: JSON.stringify(rx) });
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])

  return (
    <>
      {/* <Header /> */}
      <HeaderTesting />
      <Routes>

        <Route path="/" Component={Home} />
        <Route path="/product/:id" Component={ProductDetails} />
        <Route path="/products" Component={Products} />
        <Route path="/search" Component={Search} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
