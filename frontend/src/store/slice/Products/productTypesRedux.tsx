
//product interface
export interface Product {
    _id: string;
    name: string;
    images: { url: string }[];
    price: string;
    ratings: number;
    numOfReviews: number;
    reviews: Review[];
    description: string;
    Stock: number;
    category: string;
    user: string;
    createdAt: Date
}

// Product reviews state interface
export interface Review {
    _id: string;
    productId: string;
    rating: number;
    comment: string;
    user: string;
    createdAt: string;
    name: string
}

// Products state interface
export interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
    productsCount?: number;
    resultPerPage?: number;
    filteredProductsCount?: number;
}
// Product details state interface
export interface ProductDetailsState {
    product: Product | null;
    loading: boolean;
    error: string | null;
}

// New product state interface
export interface NewProductState {
    product: Product;
    loading: boolean;
    error: string | null;
    success: boolean;
}


// New review state interface
export interface NewReviewState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

export interface ProductReviewsState {
    reviews: Review[]; // Replace `any[]` with the actual type for reviews
    loading: boolean;
    error: string | null;
}

// Review state interface
export interface ReviewState {
    loading: boolean;
    error: string | null;
    isDeleted: boolean;
}

//Update/Delete Product 
export interface UpdateDeleteProductState {
    loading: boolean;
    error: string | null;
    isDeleted: boolean;
    isUpdated: boolean;
}
