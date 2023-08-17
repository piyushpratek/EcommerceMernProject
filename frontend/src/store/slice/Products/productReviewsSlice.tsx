import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductReviewsState, Review } from "../../../types/productTypes";

const initialProductReviewsState: ProductReviewsState = {
    reviews: [],
    loading: false,
    error: null,
};

//product review
const productReviewsSlice = createSlice({
    name: 'productReviews',
    initialState: initialProductReviewsState,
    reducers: {
        allReviewRequest: (state) => {
            state.loading = true;
        },
        allReviewSuccess: (state, action: PayloadAction<Review[]>) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        allReviewFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    allReviewRequest,
    allReviewSuccess,
    allReviewFail,
    clearErrors
} = productReviewsSlice.actions;
export const productReviewsReducer = productReviewsSlice.reducer;