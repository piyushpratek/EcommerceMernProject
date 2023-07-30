import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDetailsState, Product } from "./productTypesRedux";

const initialProductDetailsState: ProductDetailsState = {
    product: {
        _id: "",
        name: "",
        images: [],
        price: "",
        ratings: 0,
        numOfReviews: 0,
        reviews: []
    },
    loading: false,
    error: null,
};

//product details
const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: initialProductDetailsState,
    reducers: {
        productDetailsRequest: (state) => {
            state.loading = true;
        },
        productDetailsSuccess: (state, action: PayloadAction<Product>) => {
            state.loading = false;
            state.product = action.payload;
        },
        productDetailsFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    productDetailsRequest,
    productDetailsSuccess,
    productDetailsFail,
    clearErrors
} = productDetailsSlice.actions;
export const productDetailsReducer = productDetailsSlice.reducer;