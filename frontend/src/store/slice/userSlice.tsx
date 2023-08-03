import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserProfile, AllUsersData } from "../../types/userTypes";



interface UserState {
    loading: boolean;
    isAuthenticated: boolean;
    user: User | UserProfile | null;
    isUpdated: boolean;
    isDeleted: boolean;
    message: string | null;
    success: boolean | null;
    error: string | null;
    users: User[];
}

const initialState: UserState = {
    loading: false,
    isAuthenticated: false,
    user: null,
    isUpdated: false,
    isDeleted: false,
    message: null,
    success: null,
    error: null,
    users: []
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRequest(state) {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        registerUserRequest(state) {
            state.loading = true;
            state.isAuthenticated = false;
        },
        registerUserSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        registerUserFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        loadUserRequest(state) {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loadUserSuccess(state, action: PayloadAction<UserProfile>) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loadUserFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logoutSuccess(state) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
        logoutFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateProfileRequest(state) {
            state.loading = true;
        },
        updateProfileSuccess(state, action: PayloadAction<boolean>) {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateProfileFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateProfileReset(state) {
            state.isUpdated = false;
        },
        updatePasswordRequest(state) {
            state.loading = true;
        },
        updatePasswordSuccess(state, action: PayloadAction<boolean>) {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updatePasswordFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updatePasswordReset(state) {
            state.isUpdated = false;
        },
        forgotPasswordRequest(state) {
            state.loading = true;
        },
        forgotPasswordSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.message = action.payload;
        },
        forgotPasswordFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        resetPasswordRequest(state) {
            state.loading = true;
        },
        resetPasswordSuccess(state, action: PayloadAction<boolean>) {
            state.loading = false;
            state.success = action.payload;
        },
        resetPasswordFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        resetPasswordReset(state) {
            state.success = false;
        },
        allUsersRequest(state) {
            state.loading = true;
        },
        allUsersSuccess(state, action: PayloadAction<AllUsersData>) {
            state.loading = false;
            state.users = action.payload;
        },
        allUsersFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserRequest(state) {
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
        clearErrors(state) {
            state.error = null;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFail,

    registerUserRequest,
    registerUserSuccess,
    registerUserFail,

    loadUserRequest,
    loadUserSuccess,
    loadUserFail,

    allUsersRequest,
    allUsersSuccess,
    allUsersFail,

    clearErrors,

    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    deleteUserReset,

    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,

    logoutSuccess,
    logoutFail,

    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail,
    resetPasswordReset,

    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    updatePasswordReset,

    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updateProfileReset,

    userDetailsRequest,
    userDetailsSuccess,
    userDetailsFail,

    updateUserRequest,
    updateUserSuccess,
    updateUserFail,
    updateUserReset


} = userSlice.actions;

export default userSlice.reducer