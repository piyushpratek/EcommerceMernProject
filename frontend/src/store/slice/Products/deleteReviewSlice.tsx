import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewState } from "../../../types/productTypes";

const initialReviewState: ReviewState = {
    loading: false,
    error: null,
    isDeleted: false,
};


// delete review
const deleteReviewSlice = createSlice({
    name: 'deletereview',
    initialState: initialReviewState,
    reducers: {
        deleteReviewRequest: (state) => {
            state.loading = true;
        },
        deleteReviewSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteReviewFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteReviewReset: (state) => {
            state.isDeleted = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewFail,
    deleteReviewReset,
    clearErrors,
} = deleteReviewSlice.actions;
export const deleteReviewReducer = deleteReviewSlice.reducer;