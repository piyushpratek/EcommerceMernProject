import 'bootstrap/dist/css/bootstrap.min.css';

// import Header from "./component/layout/Header/Header.tsx"
import webFont from "webfontloader"
import React from 'react';
import Footer from './component/layout/Footer/Footer.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home.tsx';
import HeaderTesting from './component/layout/Header/HeaderTesting.tsx';



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
      </Routes>
      <Footer />
    </>
  )
}

export default App
