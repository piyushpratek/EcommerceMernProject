import { Link } from 'react-router-dom'
import "./Home.css"
import { Rating } from '@mui/material'
import { Product } from '../../types/productTypes';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const options = {
        value: product?.ratings,
        readOnly: true,
        precision: 0.5,
    }
    return (
        <Link className='productCard' to={`/product/${product?._id}`}>
            <img src={product?.images[0].url} alt={product?.name} />
            <p>{product?.name}</p>
            <div>
                <Rating {...options} />{" "}
                <span className="productCardSpan">
                    {" "}
                    ({product?.numOfReviews} Reviews)
                </span>
            </div>
            <span>{`₹${product?.price}`}</span>
        </Link>)
}

export default ProductCard