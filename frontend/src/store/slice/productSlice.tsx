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
        allProductLoading: (state) => {
            state.loading = true;
        },
        allProductSuccess: (
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
        allProductFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Admin products
        adminProductsLoading: (state) => {
            state.loading = true;
        },
        adminProductsSuccess: (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.products = action.payload;
            state.error = null;
        },
        adminProductsFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Add new product
        newProductLoading: (state) => {
            state.loading = true;
        },
        newProductSuccess: (state, action: PayloadAction<Product>) => {
            state.loading = false;
            state.success = true;
            state.products.push(action.payload);
        },
        newProductFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newProductReset: (state) => {
            state.success = false;
        },

        // Update product
        updateProductLoading: (state) => {
            state.loading = true;
        },
        updateProductSuccess: (state, action: PayloadAction<Product>) => {
            state.loading = false;
            state.success = true;
            const updatedProduct = action.payload;
            state.products = state.products.map((product) =>
                product._id === updatedProduct._id ? updatedProduct : product
            );
        },
        updateProductFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateProductReset: (state) => {
            state.success = false;
        },

        // Delete product
        deleteProductLoading: (state) => {
            state.loading = true;
        },
        deleteProductSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.success = true;
            state.products = state.products.filter(
                (product) => product._id !== action.payload
            );
        },
        deleteProductFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteProductReset: (state) => {
            state.success = false;
        },

        // Product details
        productDetailsLoading: (state) => {
            state.loading = true;
        },
        productDetailsSuccess: (state, action: PayloadAction<Product>) => {
            state.loading = false;
            state.product = action.payload;
        },
        productDetailsFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // New review
        newReviewLoading: (state) => {
            state.loading = true;
        },
        newReviewSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        newReviewFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newReviewReset: (state) => {
            state.success = false;
        },

        // Product reviews
        allReviewsLoading: (state) => {
            state.loading = true;
        },
        allReviewsSuccess: (state, action: PayloadAction<Review[]>) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        allReviewsFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete review
        deleteReviewLoading: (state) => {
            state.loading = true;
        },
        deleteReviewSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteReviewFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteReviewReset: (state) => {
            state.isDeleted = false;
        },

        // Clear errors
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    allProductLoading,
    allProductSuccess,
    allProductFailed,

    adminProductsLoading,
    adminProductsSuccess,
    adminProductsFailed,

    newProductLoading,
    newProductSuccess,
    newProductFailed,
    newProductReset,

    updateProductLoading,
    updateProductSuccess,
    updateProductFailed,
    updateProductReset,

    deleteProductLoading,
    deleteProductSuccess,
    deleteProductFailed,
    deleteProductReset,

    productDetailsLoading,
    productDetailsSuccess,
    productDetailsFailed,

    newReviewLoading,
    newReviewSuccess,
    newReviewFailed,
    newReviewReset,

    allReviewsLoading,
    allReviewsSuccess,
    allReviewsFailed,

    deleteReviewLoading,
    deleteReviewSuccess,
    deleteReviewFailed,
    deleteReviewReset,
    clearErrors,
} = productSlice.actions;


export default productSlice.reducer;
