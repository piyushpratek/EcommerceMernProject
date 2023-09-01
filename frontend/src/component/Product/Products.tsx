import { Fragment, useEffect, useState } from "react";
import "./Products.css";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";
import { Typography, Slider, Pagination } from "@mui/material";
import { getProducts, clearAllErrors } from "../../store/actionsHelpers/productActionHelpers";
import { useParams } from "react-router-dom";
import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../store/store";

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
    const { keyword } = useParams();
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState<[number, number] | undefined>([0, 25000]);
    const [category, setCategory] = useState<string>("");
    const [ratings, setRatings] = useState<number>(0);
    const allProducts = useAppSelector((state) => state.products)

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount
    } = allProducts

    const handleClose = () => {
        setOpen(false);
    };

    const setCurrentPageNo = (_e: React.ChangeEvent<unknown>, page: number) => {
        if (!isNaN(page)) {
            setCurrentPage(page);
        }
    };

    const priceHandler = (_event: Event, newPrice: number | number[]) => {
        if (Array.isArray(newPrice)) {
            setPrice(newPrice as [number, number]);
        }
    };

    useEffect(() => {
        if (error) {
            setOpen(true)
            dispatch(clearAllErrors());
        }
        dispatch(getProducts({ keyword, currentPage, price, category, ratings }));
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
                                onChange={(_e, newRating) => {
                                    setRatings(newRating as number);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>
                    {resultPerPage < filteredProductsCount && (
                        <div className="paginationBox">
                            <Pagination
                                count={Math.ceil(productsCount / resultPerPage)} // Calculate the total number of pages based on the total items count and items per page
                                page={currentPage}
                                onChange={setCurrentPageNo}
                                boundaryCount={2} // The number of first and last page links to show, adjust this based on your preference
                                showFirstButton // Show the "First" button
                                showLastButton // Show the "Last" button
                                color="primary" // Set the color of the pagination, you can choose from "primary", "secondary", or "standard"
                            />
                        </div>
                    )}
                    {/* //TODO */}
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
