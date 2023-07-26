// productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    // Define the structure of your Product object here
    // Example: id: number; name: string; price: number;
}

interface ProductState {
    products: Product[];
    productsCount: number;
    resultPerPage: number;
    filteredProductsCount: number;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    productsCount: 0,
    resultPerPage: 0,
    filteredProductsCount: 0,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        ALL_PRODUCT_REQUEST(state) {
            state.loading = true;
            state.error = null;
            state.products = [];
        },
        ALL_PRODUCT_SUCCESS(state, action: PayloadAction<{ products: Product[]; productsCount: number; resultPerPage: number; filteredProductsCount: number }>) {
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productsCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductsCount = action.payload.filteredProductsCount;
            state.error = null;
        },
        ADMIN_PRODUCT_SUCCESS(state, action: PayloadAction<Product[]>) {
            state.loading = false;
            state.products = action.payload;
            state.error = null;
        },
        ALL_PRODUCT_FAIL(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ERRORS(state) {
            state.error = null;
        },
        // Other reducer actions for this slice can be added here

    },
});

// Export the reducer and actions
export const { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS } = productSlice.actions;
export default productSlice.reducer;
