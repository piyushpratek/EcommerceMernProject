import React from 'react'
import "./Home.css"
import ProductCard from "./ProductCard"

interface ProductInfo {
    name: string;
    images: { url: string }[];
    price: string;
    _id: string;
}

const product: ProductInfo = {
    name: "Blue Tshirt",
    images: [{ url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=415&q=80" }],
    price: "$300",
    _id: "piyush"
}
const Home: React.FC = () => {
    return (
        <>
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll<i className="bi bi-mouse"></i>
                    </button>
                </a>
            </div><h2 className="homeHeading">Featured Products</h2>
            <div className="container" id="container">
                <ProductCard product={product} />
            </div>
        </>

    )
}

export default Home