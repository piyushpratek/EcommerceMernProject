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
        allProductRequest(state) {
            state.loading = true;
            state.error = null;
        },
        allProductSuccess(state, action: PayloadAction<{ products: Note[]; productsCount: number; resultPerPage: number; filteredProductsCount: number }>) {
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productsCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductsCount = action.payload.filteredProductsCount;
            state.error = null;
        },
        allProductFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        // Other reducer actions for this slice can be added here
    },
});

// Export the reducer and actions
export const { allProductRequest, allProductSuccess, allProductFail } = productSlice.actions;
export default productSlice.reducer;
