import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewReviewState } from "../../../types/productTypes";

const initialNewReviewState: NewReviewState = {
    loading: false,
    error: null,
    success: false,
};

//new review
const newReviewSlice = createSlice({
    name: 'newReview',
    initialState: initialNewReviewState,
    reducers: {
        newReviewRequest: (state) => {
            state.loading = true;
        },
        newReviewSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.success = action.payload;
        },
        newReviewFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newReviewReset: (state) => {
            state.success = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    newReviewRequest,
    newReviewSuccess,
    newReviewFail,
    newReviewReset,
    clearErrors
} = newReviewSlice.actions;
export const newReviewReducer = newReviewSlice.reducer;