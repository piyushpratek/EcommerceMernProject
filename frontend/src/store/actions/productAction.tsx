import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
    setProductsListLoading,
    setProductsListSuccess,
    setProductsListFailed,

    setAdminProductsLoading,
    setAdminProductsSuccess,
    setAdminProductsFailed,

    setNewProductLoading,
    setNewProductSuccess,
    setNewProductFailed,
    // resetNewProductSuccess,

    setUpdateProductLoading,
    setUpdateProductSuccess,
    setUpdateProductFailed,
    // resetUpdateProductSuccess,

    setDeleteProductLoading,
    setDeleteProductSuccess,
    setDeleteProductFailed,
    // resetDeleteProductSuccess,

    setProductDetailsLoading,
    setProductDetailsSuccess,
    setProductDetailsFailed,

    setNewReviewLoading,
    setNewReviewSuccess,
    setNewReviewFailed,
    // resetNewReviewSuccess,

    setProductReviewsLoading,
    setProductReviewsSuccess,
    setProductReviewsFailed,

    setDeleteReviewLoading,
    setDeleteReviewSuccess,
    setDeleteReviewFailed,
    // resetDeleteReview,

    clearErrors,
} from "../slice/productSlice";

type ProductData = {
    name: string;
    price: number;
    category: string;
    description: string;
    stock: number;
    imageUrl: string;
};

interface ReviewData {
    // Define the properties of the review data
    // For example:
    rating: number;
    comment: string;
    // Add other properties as needed
}

// Defining the parameters that the action accepts
export interface GetProductParams {
    keyword?: string;
    currentPage?: number;
    price?: [number, number];
    category?: string;
    ratings?: number;
}

interface ErrorResponse {
    message: string;
}
// Get All Products
export const getProduct = (params: GetProductParams) => async (dispatch: Dispatch) => {
    try {
        dispatch(setProductsListLoading())
        // const { keyword = "", currentPage = 1, price = [0, 25000],ratings = 0, category  } = params
        const { category } = params
        let link = `/api/v1/products`;
        if (category) {
            link = `/api/v1/products`;
        }
        const { data } = await axios.get(link);

        dispatch(setProductsListSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(setProductsListFailed(message));
    }
};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAdminProductsLoading())
        const { data } = await axios.get('/api/v1/admin/products');
        dispatch(setAdminProductsSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(setAdminProductsFailed(message))
    }
};

// Create Product
export const createProduct = async (dispatch: Dispatch, productData: ProductData,) => {
    try {
        dispatch(setNewProductLoading())
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const { data } = await axios.post(
            `/api/v1/admin/product/new`,
            productData,
            config
        );
        dispatch(setNewProductSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(setNewProductFailed(message))
    }
};

// Update Product
export const updateProduct = ({ id, productData }: { id: string; productData: ProductData }) => async (dispatch: Dispatch) => {
    try {
        dispatch(setUpdateProductLoading())
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const { data } = await axios.put(
            `/api/v1/admin/product/${id}`,
            productData,
            config
        );
        dispatch(setUpdateProductSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(setUpdateProductFailed(message));
    }
};

// Delete Product
export const deleteProduct = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setDeleteProductLoading())
        const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
        dispatch(setDeleteProductSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(setDeleteProductFailed(message));
    }
};

// Get Products Details
export const getProductDetails = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setProductDetailsLoading());

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch(setProductDetailsSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(setProductDetailsFailed(message));
    }
};

// NEW REVIEW
export const newReview = (reviewData: ReviewData) => async (dispatch: Dispatch) => {
    try {
        dispatch(setNewReviewLoading());

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(`/api/v1/review`, reviewData, config);
        dispatch(setNewReviewSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(setNewReviewFailed(message));
    }
};

// Get All Reviews of a Product
export const getAllReviews = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setProductReviewsLoading());
        const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
        dispatch(setProductReviewsSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(setProductReviewsFailed(message));
    }
};

// Delete Review of a Product
export const deleteReviews = (reviewId: string, productId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setDeleteReviewLoading());
        const { data } = await axios.delete(
            `/api/v1/reviews?id=${reviewId}&productId=${productId}`
        );
        dispatch(setDeleteReviewSuccess(data))
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(setDeleteReviewFailed(message));
    }
};

// Clearing Errors
export const clearAllErrors = () => async (dispatch: Dispatch) => {
    dispatch(clearErrors());
};
