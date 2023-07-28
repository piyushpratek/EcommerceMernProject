import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the types/interfaces for Product, Review, and other related types
interface Review {
    _id: string;
    productId: string;
    rating: number;
    comment: string;
    user: string;
    createdAt: string;
}

interface Product {
    _id: string;
    name: string;
    images: { url: string }[];
    price: string;
    ratings: number;
    numOfReviews: number;
    reviews: Review[];
    // Define other properties specific to the product here
}

interface ProductState {
    loading: boolean;
    products: Product[];
    error: string | null;
    success: boolean;
    productsCount: number;
    resultPerPage: number;
    filteredProductsCount: number;
    isDeleted: boolean;
    isUpdated: boolean;
    product: Product | null;
    reviews: Review[];
}

const initialState: ProductState = {
    loading: false,
    products: [],
    error: null,
    success: false,
    productsCount: 0,
    resultPerPage: 0,
    filteredProductsCount: 0,
    isDeleted: false,
    isUpdated: false,
    product: null,
    reviews: [],
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // List products
        setProductsListLoading: (state) => {
            state.loading = true;
        },
        setProductsListSuccess: (
            state,
            action: PayloadAction<{
                products: Product[];
                productsCount: number;
                resultPerPage: number;
                filteredProductsCount: number;
            }>
        ) => {
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productsCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductsCount = action.payload.filteredProductsCount;
            state.error = null;
        },
        setProductsListFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Admin products
        setAdminProductsLoading: (state) => {
            state.loading = true;
        },
        setAdminProductsSuccess: (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.products = action.payload;
            state.error = null;
        },
        setAdminProductsFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Add new product
        setNewProductLoading: (state) => {
            state.loading = true;
        },
        setNewProductSuccess: (state, action: PayloadAction<Product>) => {
            state.loading = false;
            state.success = true;
            state.products.push(action.payload);
        },
        setNewProductFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetNewProductSuccess: (state) => {
            state.success = false;
        },

        // Update product
        setUpdateProductLoading: (state) => {
            state.loading = true;
        },
        setUpdateProductSuccess: (state, action: PayloadAction<Product>) => {
            state.loading = false;
            state.success = true;
            const updatedProduct = action.payload;
            state.products = state.products.map((product) =>
                product._id === updatedProduct._id ? updatedProduct : product
            );
        },
        setUpdateProductFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetUpdateProductSuccess: (state) => {
            state.success = false;
        },

        // Delete product
        setDeleteProductLoading: (state) => {
            state.loading = true;
        },
        setDeleteProductSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.success = true;
            state.products = state.products.filter(
                (product) => product._id !== action.payload
            );
        },
        setDeleteProductFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetDeleteProductSuccess: (state) => {
            state.success = false;
        },

        // Product details
        setProductDetailsLoading: (state) => {
            state.loading = true;
        },
        setProductDetailsSuccess: (state, action: PayloadAction<Product>) => {
            state.loading = false;
            state.product = action.payload;
        },
        setProductDetailsFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // New review
        setNewReviewLoading: (state) => {
            state.loading = true;
        },
        setNewReviewSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        setNewReviewFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetNewReviewSuccess: (state) => {
            state.success = false;
        },

        // Product reviews
        setProductReviewsLoading: (state) => {
            state.loading = true;
        },
        setProductReviewsSuccess: (state, action: PayloadAction<Review[]>) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        setProductReviewsFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete review
        setDeleteReviewLoading: (state) => {
            state.loading = true;
        },
        setDeleteReviewSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        setDeleteReviewFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetDeleteReview: (state) => {
            state.isDeleted = false;
        },

        // Clear errors
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    setProductsListLoading,
    setProductsListSuccess,
    setProductsListFailed,
    setAdminProductsLoading,
    setAdminProductsSuccess,
    setAdminProductsFailed,
    setNewProductLoading,
    setNewProductSuccess,
    setNewProductFailed,
    resetNewProductSuccess,
    setUpdateProductLoading,
    setUpdateProductSuccess,
    setUpdateProductFailed,
    resetUpdateProductSuccess,
    setDeleteProductLoading,
    setDeleteProductSuccess,
    setDeleteProductFailed,
    resetDeleteProductSuccess,
    setProductDetailsLoading,
    setProductDetailsSuccess,
    setProductDetailsFailed,
    setNewReviewLoading,
    setNewReviewSuccess,
    setNewReviewFailed,
    resetNewReviewSuccess,
    setProductReviewsLoading,
    setProductReviewsSuccess,
    setProductReviewsFailed,
    setDeleteReviewLoading,
    setDeleteReviewSuccess,
    setDeleteReviewFailed,
    resetDeleteReview,
    clearErrors,
} = productSlice.actions;

export default productSlice.reducer;
