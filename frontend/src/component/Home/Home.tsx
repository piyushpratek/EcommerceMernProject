import React, { useEffect } from 'react'
import "./Home.css"
import ProductCard from "./ProductCard"
import { CgMouse } from "react-icons/cg";
import MetaData from '../layout/MetaData';
import { getProduct } from '../../store/actions/productActions';
import { RootState, useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';


const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const { loading, error, products, productsCount } = useSelector((state: RootState) => state.products);


    useEffect(() => {
        dispatch(getProduct({}))
    }, [dispatch])
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