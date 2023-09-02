import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserProfile } from "../../../types/userTypes";

//Todo rename this to updateUserSlice 
interface UsersDetailsState {
    loading: boolean;
    success: boolean | null;
    error: string | null;
    user: User | UserProfile | null;
    isUpdated: boolean;
    isDeleted: boolean;
    // message: string | null;
}
const initialState: UsersDetailsState = {
    loading: true,
    success: null,
    error: null,
    user: null,
    isDeleted: false,
    isUpdated: false,
    // message: null,
};

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        userDetailsRequest(state) {
            state.loading = true;
        },
        userDetailsSuccess(state, action: PayloadAction<UserProfile>) {
            state.loading = false;
            state.user = action.payload;
        },
        userDetailsFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        }, deleteUserRequest(state) {
            state.loading = true;
        },
        deleteUserSuccess(state, action: PayloadAction<boolean>) {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteUserFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserReset(state) {
            state.isDeleted = false;
        },
        updateUserRequest(state) {
            state.loading = true;
        },
        updateUserSuccess(state, action: PayloadAction<boolean>) {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateUserFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserReset(state) {
            state.isUpdated = false;
        },
    },
});

export const {
    userDetailsRequest,
    userDetailsSuccess,
    userDetailsFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    deleteUserReset,
    updateUserRequest,
    updateUserSuccess,
    updateUserFail,
    updateUserReset,
} = userDetailsSlice.actions;

export default userDetailsSlice.reducer