// productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
    // Define the structure of your Note object here
    // Example: title: string; content: string; category: string;
}

interface ProductState {
    products: Note[];
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
    name: 'product',
    initialState,
    reducers: {
        ALL_PRODUCT_REQUEST(state) {
            state.loading = true;
            state.error = null;
        },
        ALL_PRODUCT_SUCCESS(state, action: PayloadAction<{ products: Note[]; productsCount: number; resultPerPage: number; filteredProductsCount: number }>) {
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productsCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductsCount = action.payload.filteredProductsCount;
            state.error = null;
        },
        ALL_PRODUCT_FAIL(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        // Other reducer actions for this slice can be added here
    },
});

// Export the reducer and actions
export const { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL } = productSlice.actions;
export default productSlice.reducer;
