import React, { useEffect } from 'react'
import "./Home.css"
import ProductCard from "./ProductCard"
import { CgMouse } from "react-icons/cg";
import MetaData from '../layout/MetaData';
import { getProduct, clearAllErrors } from '../../store/actions/productAction';
import { RootState, useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const { loading, error, products, productsCount } = useSelector((state: RootState) => state.product);


    useEffect(() => {
        if (error) {
            dispatch(clearAllErrors())
        }
        dispatch(getProduct({}))
    }, [dispatch, error])
    return (
        <>
            {error && <ErrorMessage error={error} />}
            {loading ? (<Loader />) : (
                <>
                    <MetaData title="ECOMMERCE" />
                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">
                            <button>
                                Scroll
                                <CgMouse />
                            </button>
                        </a>
                    </div><h2 className="homeHeading">Featured Products</h2>
                    <div className="container" id="container">
                        {products && products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}

                    </div>



                </>
            )}
        </>

    )
}

export default Home