import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
    loginFail,
    loginRequest,
    loginSuccess,

    registerUserFail,
    registerUserRequest,
    registerUserSuccess,

    loadUserFail,
    loadUserRequest,
    loadUserSuccess,

    allUsersFail,
    allUsersRequest,
    allUsersSuccess,

    clearErrors,

    deleteUserFail,
    deleteUserRequest,
    deleteUserSuccess,

    forgotPasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,


    logoutFail,
    logoutSuccess,

    resetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,

    updatePasswordFail,
    updatePasswordRequest,
    updatePasswordSuccess,

    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,

    userDetailsFail,
    userDetailsRequest,
    userDetailsSuccess
} from '../slice/userSlice';

interface ErrorResponse {
    message: string;
}
type LoginParams = {
    email: string;
    password: string;
};

// Login
export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(loginRequest());
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
        );

        dispatch(loginSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(loginFail(message));
    }
};

// Register
export const register = (userData: LoginParams) => async (dispatch: Dispatch) => {
    try {
        dispatch(registerUserRequest());

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/v1/register`, userData, config);

        dispatch(registerUserSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(registerUserFail(message));
    }
};

// Load User
export const loadUser = () => async (dispatch: Dispatch) => {
    try {
        dispatch(loadUserRequest());

        const { data } = await axios.get(`/api/v1/me`);

        dispatch(loadUserSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(loadUserFail(message));
    }
};

// Logout User
export const logout = () => async (dispatch: Dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);

        dispatch(logoutSuccess());
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(logoutFail(message));
    }
};

// Update Profile
export const updateProfile = (userData: LoginParams) => async (dispatch: Dispatch) => {
    try {
        dispatch(updateProfileRequest());

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/v1/me/update`, userData, config);

        dispatch(updateProfileSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(updateProfileFail(message));
    }
};

// Update Password
export const updatePassword = (passwords: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(updatePasswordRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/password/update`,
            passwords,
            config
        );

        dispatch(updatePasswordSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(updatePasswordFail(message));
    }
};

// Forgot Password
export const forgotPassword = (email: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(forgotPasswordRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/v1/password/forgot`, email, config);

        dispatch(forgotPasswordSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(forgotPasswordFail(message));
    }
};

// Reset Password
export const resetPassword = (token: string, passwords: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(resetPasswordRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        );

        dispatch(resetPasswordSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(resetPasswordFail(message));
    }
};

// Reset Password
export const getAllUsers = () => async (dispatch: Dispatch) => {
    try {
        dispatch(allUsersRequest());
        const { data } = await axios.get(`/api/v1/admin/users`);

        dispatch(allUsersSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(allUsersFail(message));
    }
};

// get  User Details
export const getUserDetails = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(userDetailsRequest());
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);

        dispatch(userDetailsSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(userDetailsFail(message));
    }
};

// Update User
export const updateUser = (id: string, userData: LoginParams) => async (dispatch: Dispatch) => {
    try {
        dispatch(updateProfileRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/admin/user/${id}`,
            userData,
            config
        );

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete User
export const deleteUser = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(deleteUserRequest());

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch(deleteUserSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(deleteUserFail(message));
    }
};

// Clearing Errors
export const clearAllErrors = () => async (dispatch: Dispatch) => {
    dispatch(clearErrors());
};
