import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, Product } from "./productTypesRedux";

// PayloadType.ts
interface PayloadType {
    products: Product[];
    productsCount: number;
    resultPerPage: number;
    filteredProductsCount: number;
}

const initialProductsState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};

//All  Products  slice
const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        allProductRequest: (state) => {
            state.loading = true;
        },
        allProductSuccess: (state, action: PayloadAction<PayloadType>) => {
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productsCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductsCount = action.payload.filteredProductsCount;
        },
        adminProductRequest: (state) => {
            state.loading = true;
        },
        adminProductSuccess: (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.products = action.payload;
        },
        allProductFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        adminProductFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    allProductRequest,
    allProductSuccess,
    adminProductSuccess,
    allProductFail, adminProductRequest, adminProductFail,
    clearErrors,
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;