import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateDeleteProductState } from "./productTypesRedux";

const initialUpdateDeleteProductState: UpdateDeleteProductState = {
    loading: false,
    error: null,
    isDeleted: false,
    isUpdated: false,
};

//update/delete product
const updateDeleleteproductSlice = createSlice({
    name: 'updatedeleteproduct',
    initialState: initialUpdateDeleteProductState,
    reducers: {
        deleteProductRequest: (state) => {
            state.loading = true;
        },
        updateProductRequest: (state) => {
            state.loading = true;
        },
        deleteProductSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        updateProductSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        deleteProductFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateProductFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteProductReset: (state) => {
            state.isDeleted = false;
        },
        updateProductReset: (state) => {
            state.isUpdated = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    deleteProductRequest,
    updateProductRequest,
    deleteProductSuccess,
    updateProductSuccess,
    deleteProductFail,
    updateProductFail,
    deleteProductReset,
    updateProductReset,
    clearErrors,
} = updateDeleleteproductSlice.actions;
export const updateDeleleteproductReducer = updateDeleleteproductSlice.reducer