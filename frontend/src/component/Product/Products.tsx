import { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";
import { Typography, Slider, Pagination } from "@mui/material";
import { getProducts, clearAllErrors } from "../../store/actionsHelper/productAction";
import { useParams } from "react-router-dom";
import { Alert, Snackbar } from '@mui/material';
import { RootState, useAppDispatch } from "../../store/store";

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

const Products = () => {
    const dispatch = useAppDispatch();
    // const params = useParams()
    const { keyword } = useParams();
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState<[number, number]>([0, 25000]);
    const [category, setCategory] = useState<string>("");
    const [ratings, setRatings] = useState<number>(0);
    const allProducts = useSelector((state: RootState) => state.products)
    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    } = allProducts

    // const keyword = params?.keyword;

    const handleClose = () => {
        setOpen(false);
    };

    // const setCurrentPageNo = (e, page) => {
    //     setCurrentPage(page);
    // };
    const setCurrentPageNo = (e, page) => {
        if (!isNaN(page)) {
            setCurrentPage(page);
        }
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice as [number, number]);
    };
    const count = filteredProductsCount;

    useEffect(() => {
        if (error) {
            setOpen(true)
            dispatch(clearAllErrors());
        }
        dispatch(getProducts(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, error]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="PRODUCTS -- ECOMMERCE" />
                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {products?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />

                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating as number);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>
                    {resultPerPage < count && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
                            {error ? error : 'Review Submitted Successfully'}
                        </Alert>
                    </Snackbar>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products;