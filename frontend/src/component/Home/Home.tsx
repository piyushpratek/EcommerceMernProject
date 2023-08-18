import { useEffect } from 'react'
import "./Home.css"
import ProductCard from "./ProductCard"
import { CgMouse } from "react-icons/cg";
import MetaData from '../layout/MetaData';
import { getProducts, clearAllErrors } from '../../store/actionsHelpers/productActionHelpers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Loader from '../layout/Loader/Loader';

const Home = () => {
    const dispatch = useAppDispatch()
    const product = useAppSelector((state) => state.products)
    const { loading, error, products } = product

    useEffect(() => {
        if (error) {
            dispatch(clearAllErrors())
        }
        dispatch(getProducts({}))
    }, [dispatch, error])

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

                </>

            )}
        </>

    )
}

export default Home