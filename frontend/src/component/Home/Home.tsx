import React from 'react'
import { CgMouse } from "react-icons/all"
const Home: React.FC = () => {
    return (
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
                <button>
                    Scroll<CgMouse />
                </button>
            </a>
        </div>)
}

export default Home