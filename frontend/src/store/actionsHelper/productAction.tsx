import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { clearErrors } from '../slice/Products/allProductsSlice';
import { deleteReviewRequest, deleteReviewSuccess, deleteReviewFail } from '../slice/Products/deleteReviewSlice';
import { newProductRequest, newProductSuccess, newProductFail } from '../slice/Products/newProductSlice';
import { newReviewRequest, newReviewSuccess, newReviewFail } from '../slice/Products/newReviewSlice';
import { productDetailsRequest, productDetailsSuccess, productDetailsFail } from '../slice/Products/productDetailsSlice';
import { allReviewRequest, allReviewSuccess, allReviewFail } from '../slice/Products/productReviewsSlice';
import { allProductRequest, allProductSuccess, allProductFail, adminProductSuccess, adminProductRequest, adminProductFail } from '../slice/Products/allProductsSlice';
import { updateProductRequest, updateProductSuccess, updateProductFail, deleteProductRequest, deleteProductSuccess, deleteProductFail } from '../slice/Products/updateDeleteProductSlice';

type ProductData = {
    name: string;
    price: number;
    category: string;
    description: string;
    stock: number;
    imageUrl: string;
};

interface ReviewData {
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
export const getProducts = (params: GetProductParams) => async (dispatch: Dispatch) => {
    try {
        dispatch(allProductRequest())
        const { keyword = "", currentPage = 1, price = [0, 25000], ratings = 0, category } = params ?? {}

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
            // link += `&category=${category}`
        }
        // const category = params?.category
        // const keyword = params?.keyword
        // let link = `/api/v1/products?keyword=${keyword}`;
        // if (category) {
        //     link = `/api/v1/products`;
        // }
        const { data } = await axios.get(link);
        dispatch(allProductSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(allProductFail(message));
    }
};

// Get Products Details
export const getProductDetails = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(productDetailsRequest());
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch(productDetailsSuccess(data.product));

    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(productDetailsFail(message));
    }
};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch: Dispatch) => {
    try {
        dispatch(adminProductRequest())
        const { data } = await axios.get('/api/v1/admin/products');
        dispatch(adminProductSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(adminProductFail(message))
    }
};

// Create Product
export const createProduct = async (dispatch: Dispatch, productData: ProductData,) => {
    try {
        dispatch(newProductRequest())
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
        dispatch(newProductFail(message))
    }
};

// Update Product
export const updateProduct = ({ id, productData }: { id: string; productData: ProductData }) => async (dispatch: Dispatch) => {
    try {
        dispatch(updateProductRequest())
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
        dispatch(updateProductFail(message));
    }
};

// Delete Product
export const deleteProduct = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(deleteProductRequest())
        const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
        dispatch(deleteProductSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(deleteProductFail(message));
    }
};

// NEW REVIEW
export const newReview = (reviewData: ReviewData) => async (dispatch: Dispatch) => {
    try {
        dispatch(newReviewRequest());

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(`/api/v1/review`, reviewData, config);
        dispatch(newReviewSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(newReviewFail(message));
    }
};

// Get All Reviews of a Product
export const getAllReviews = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(allReviewRequest());
        const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
        dispatch(allReviewSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(allReviewFail(message));
    }
};

// Delete Review of a Product
export const deleteReviews = (reviewId: string, productId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(deleteReviewRequest());
        const { data } = await axios.delete(
            `/api/v1/reviews?id=${reviewId}&productId=${productId}`
        );
        dispatch(deleteReviewSuccess(data))
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(deleteReviewFail(message));
    }
};

// Clearing Errors
export const clearAllErrors = () => async (dispatch: Dispatch) => {
    dispatch(clearErrors());
};
