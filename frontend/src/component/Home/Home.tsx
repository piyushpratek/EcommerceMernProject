import React, { useEffect } from 'react'
import "./Home.css"
import ProductCard from "./ProductCard"
import { CgMouse } from "react-icons/cg";
import MetaData from '../layout/MetaData';
import { getProducts, clearAllErrors } from '../../store/actionsHelper/productAction';
import { RootState, useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const product = useSelector((state: RootState) => state.products)
    const { loading, error, products } = product
    const [open, setOpen] = React.useState(!!error);

    useEffect(() => {
        if (error) {
            setOpen(true)
            dispatch(clearAllErrors())
        }
        dispatch(getProducts({}))
    }, [dispatch, error])

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
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
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            {error}
                        </Alert>
                    </Snackbar>
                </>


            )}
        </>

    )
}

export default Home