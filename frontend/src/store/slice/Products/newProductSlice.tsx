import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewProductState, Product } from "./productTypesRedux";

const initialNewProductState: NewProductState = {
    product: {
        _id: "",
        name: "",
        images: [],
        price: "",
        ratings: 0,
        numOfReviews: 0,
        reviews: [],
        description: "",
        Stock: 0,
        category: "",
        user: ""
    },
    loading: false,
    error: null,
    success: false,
};

// New product add
const newProductSlice = createSlice({
    name: 'newProduct',
    initialState: initialNewProductState,
    reducers: {
        newProductRequest: (state) => {
            state.loading = true;
        },
        newProductSuccess: (state, action: PayloadAction<Product>) => {
            state.loading = false;
            state.success = true;
            state.product = action.payload;
        },
        newProductFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newProductReset: (state) => {
            state.success = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    newProductRequest,
    newProductSuccess,
    newProductFail,
    newProductReset,
    clearErrors,
} = newProductSlice.actions;
export const newProductReducer = newProductSlice.reducer;