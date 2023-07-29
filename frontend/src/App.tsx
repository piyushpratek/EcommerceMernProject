import 'bootstrap/dist/css/bootstrap.min.css';

// import Header from "./component/layout/Header/Header.tsx"
import webFont from "webfontloader"
import React from 'react';
import Footer from './component/layout/Footer/Footer.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home.tsx';
import HeaderTesting from './component/layout/Header/HeaderTesting.tsx';
import ProductDetails from './component/Product/ProductDetails.tsx';


function App() {
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

        <Route path="/" Component={Home as React.FC} />
        {/* <Route path="/product/:id" Component={ProductDetails as React.FC} /> */}
      </Routes>
      <Footer />
    </>
  )
}

export default App
