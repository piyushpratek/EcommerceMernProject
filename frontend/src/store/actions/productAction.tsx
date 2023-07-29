import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {

    allProductLoading,
    allProductSuccess,
    allProductFailed,
    adminProductsLoading,
    adminProductsSuccess,
    adminProductsFailed,
    newProductLoading,
    newProductSuccess,
    newProductFailed,
    updateProductLoading,
    updateProductSuccess,
    updateProductFailed,
    deleteProductLoading,
    deleteProductSuccess,
    deleteProductFailed,
    productDetailsLoading,
    productDetailsSuccess,
    productDetailsFailed,
    newReviewLoading,
    newReviewSuccess,
    newReviewFailed,
    allReviewsLoading,
    allReviewsSuccess,
    allReviewsFailed,
    deleteReviewLoading,
    deleteReviewSuccess,
    deleteReviewFailed,
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
        dispatch(allProductLoading())
        const { keyword = "", currentPage = 1, price = [0, 25000], ratings = 0, category } = params
        // const { category } = params
        // let link = `/api/v1/products`;
        // if (category) {
        //     link = `/api/v1/products`;
        // }
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        const { data } = await axios.get(link);

        dispatch(allProductSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(allProductFailed(message));
    }
};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch: Dispatch) => {
    try {
        dispatch(adminProductsLoading())
        const { data } = await axios.get('/api/v1/admin/products');
        dispatch(adminProductsSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(adminProductsFailed(message))
    }
};

// Create Product
export const createProduct = async (dispatch: Dispatch, productData: ProductData,) => {
    try {
        dispatch(newProductLoading())
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const { data } = await axios.post(
            `/api/v1/admin/product/new`,
            productData,
            config
        );
        dispatch(newProductSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(newProductFailed(message))
    }
};

// Update Product
export const updateProduct = ({ id, productData }: { id: string; productData: ProductData }) => async (dispatch: Dispatch) => {
    try {
        dispatch(updateProductLoading())
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const { data } = await axios.put(
            `/api/v1/admin/product/${id}`,
            productData,
            config
        );
        dispatch(updateProductSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(updateProductFailed(message));
    }
};

// Delete Product
export const deleteProduct = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(deleteProductLoading())
        const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
        dispatch(deleteProductSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(deleteProductFailed(message));
    }
};

// Get Products Details
export const getProductDetails = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(productDetailsLoading());

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch(productDetailsSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(productDetailsFailed(message));
    }
};

// NEW REVIEW
export const newReview = (reviewData: ReviewData) => async (dispatch: Dispatch) => {
    try {
        dispatch(newReviewLoading());

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(`/api/v1/review`, reviewData, config);
        dispatch(newReviewSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(newReviewFailed(message));
    }
};

// Get All Reviews of a Product
export const getAllReviews = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(allReviewsLoading());
        const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
        dispatch(allReviewsSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(allReviewsFailed(message));
    }
};

// Delete Review of a Product
export const deleteReviews = (reviewId: string, productId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(deleteReviewLoading());
        const { data } = await axios.delete(
            `/api/v1/reviews?id=${reviewId}&productId=${productId}`
        );
        dispatch(deleteReviewSuccess(data))
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(deleteReviewFailed(message));
    }
};

// Clearing Errors
export const clearAllErrors = () => async (dispatch: Dispatch) => {
    dispatch(clearErrors());
};
