import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserProfile } from "../../../types/userTypes";

type AlertSeverity = 'error' | 'warning' | 'info' | 'success';
type AlertMessageType = { message: string, severity: AlertSeverity };
interface UserState {
    loading: boolean;
    isAuthenticated: boolean;
    user: User | UserProfile | null;
    isUpdated: boolean;
    message: string | null;
    success: boolean | null;
    error: string | null;
    alertMessage: AlertMessageType;
}

const initialState: UserState = {
    loading: true,
    isAuthenticated: false,
    user: null,
    isUpdated: false,
    message: null,
    success: null,
    error: null,
    alertMessage: {
        message: '',
        severity: 'info',
    },
};
//Todo- change to userSlice to loggedInUserlice
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

        clearErrors(state) {
            state.error = null;
        },
        setAlertMessage(state, action: PayloadAction<AlertMessageType>) {
            state.alertMessage = action.payload;
        },
        clearAlertMessage(state) {
            state.alertMessage = { message: '', severity: 'info' };
        }
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

    clearErrors,

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

    setAlertMessage,
    clearAlertMessage,
} = userSlice.actions;

export default userSlice.reducer