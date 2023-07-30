import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { getProduct } from '../../store/actionsHelper/productAction';
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { RootState } from '../../store/store';
import { clearErrors } from "../../store/slice/productSlice";

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(getProduct({ category: "Laptop" }));
    }, [dispatch]);

    const [open, setOpen] = React.useState(!!error);

    useEffect(() => {
        if (error) {
            setOpen(true);
            dispatch(clearErrors());
        }
    }, [error, dispatch]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <MetaData title="ECOMMERCE" />

            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </Fragment>
                )}
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Fragment>
    );
};

export default Home;
