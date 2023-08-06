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
    userDetailsSuccess,
    updateUserRequest,
    updateUserSuccess,
    updateUserFail
} from '../slice/userSlice';

interface ErrorResponse {
    message: string;
}
type LoginData = {
    email: string;
    password: string;
    name: string;
    createdAt: string
    avatar?: (File | null) | undefined
};

type ForgotPassword = {
    email: string
}

type ResetPasword = {
    token: string;
    passwords: string
    password: string
    confirmPassword: string
}
type UpdatePassword = {
    passwords: string;
    oldPassword: string
    newPassword: string
    confirmPassword: string
}

// Login User
export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(loginRequest());
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
        );

        dispatch(loginSuccess(data.user));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(loginFail(message));
    }
};

// Register User
export const register = (loginData: LoginData) => async (dispatch: Dispatch) => {
    const myForm = new FormData();
    myForm.set("name", loginData.name);
    myForm.set("email", loginData.email);
    myForm.set("password", loginData.password);
    if (loginData?.avatar instanceof File) {
        myForm.set("avatar", loginData?.avatar);
    }

    try {
        dispatch(registerUserRequest());
        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/v1/register`, myForm, config);

        dispatch(registerUserSuccess(data.user));
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

        dispatch(loadUserSuccess(data.user));
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

// Remove `passsword` and `createdAt` form the `LoginData` type
type UpdateProfileDataType = Omit<LoginData, 'password' | 'createdAt'>

// Update Profile
export const updateProfile = (userData: UpdateProfileDataType) => async (dispatch: Dispatch) => {
    const myForm = new FormData();

    myForm.set("name", userData?.name);
    myForm.set("email", userData?.email);

    if (userData?.avatar instanceof Blob) {
        myForm.set("avatar", userData?.avatar);
    }
    try {
        dispatch(updateProfileRequest());

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/v1/me/update`, myForm, config);

        dispatch(updateProfileSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(updateProfileFail(message));
    }
};

// Update Password
export const updatePassword = (updatePassword: UpdatePassword) => async (dispatch: Dispatch) => {

    const myForm = new FormData();
    myForm.set("oldPassword", updatePassword?.oldPassword);
    myForm.set("newPassword", updatePassword?.newPassword);
    myForm.set("confirmPassword", updatePassword?.confirmPassword);

    try {

        dispatch(updatePasswordRequest());
        const passwords = updatePassword.passwords
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
export const forgotPassword = (forgotPassword: ForgotPassword) => async (dispatch: Dispatch) => {
    const myForm = new FormData();
    myForm.set("email", forgotPassword?.email)
    try {
        dispatch(forgotPasswordRequest());
        const email = forgotPassword?.email

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
export const resetPassword = (resetPassword: ResetPasword) => async (dispatch: Dispatch) => {

    const myForm = new FormData();
    myForm.set("password", resetPassword?.password);
    myForm.set("confirmPassword", resetPassword?.confirmPassword);
    try {
        dispatch(resetPasswordRequest());
        const token = resetPassword?.token
        const passwords = resetPassword?.passwords
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

// Get All User
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
export const updateUser = (id: string, userData: LoginData) => async (dispatch: Dispatch) => {
    try {
        dispatch(updateUserRequest());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/admin/user/${id}`,
            userData,
            config
        );

        dispatch(updateUserSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(updateUserFail(message));
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
