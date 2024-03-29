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
import { setAlertMessage } from '../slice/user/userSlice';

export type ProductData = {
    name: string;
    price: number;
    category: string;
    description: string;
    stock: number;
    images: File[];
};

export interface ReviewData {
    rating: number;
    comment: string;
}

// Defining the parameters that the action accepts
export interface GetProductParams {
    keyword?: string;
    currentPage?: number;
    price?: [number, number] | undefined;
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
        // const { keyword = "", currentPage = 1, price = [0, 25000], ratings = 0, category } = params

        // Using more robust way instead of above.
        const keyword = params?.keyword ?? ''
        const currentPage = params?.currentPage ?? 1
        const price = params?.price ?? [0, 25_000]
        const ratings = params?.ratings ?? 0
        const category = params?.category

        // TODO: Discuss with Sahil for axios `params` api
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const { data } = await axios.get(link);
        dispatch(allProductSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(allProductFail(message));
        dispatch(setAlertMessage({
            message: message,
            severity: "error"
        }))
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
        dispatch(setAlertMessage({ message: message, severity: "error" }))
    }
};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch: Dispatch) => {
    try {
        dispatch(adminProductRequest())
        const { data } = await axios.get('/api/v1/admin/products');
        dispatch(adminProductSuccess(data.products));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(adminProductFail(message))
    }
};

// Create Product
export const createProduct = (productData: ProductData) => async (dispatch: Dispatch) => {

    const myForm = new FormData();
    myForm.set('name', productData.name);
    myForm.set('description', productData.description);
    myForm.set('category', productData.category);
    myForm.set('price', productData.price.toString());
    myForm.set('Stock', productData.stock.toString());

    productData.images.forEach((image) => {
        myForm.append('images', image);
    });

    const payload = myForm;
    try {
        dispatch(newProductRequest())
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };
        const { data } = await axios.post(
            `/api/v1/admin/product/new`,
            payload,
            config
        );
        dispatch(newProductSuccess(data.products));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(newProductFail(message))
    }
};

type UpdateProduct = { id: string; productData: ProductData };
// Update Product
export const updateProduct = (updateProductData: UpdateProduct) => async (dispatch: Dispatch) => {
    const myForm = new FormData();
    myForm.set("name", updateProductData?.productData?.name)
    myForm.set('price', updateProductData?.productData?.price.toString());
    myForm.set('description', updateProductData?.productData?.description);
    myForm.set('category', updateProductData?.productData?.category);
    myForm.set('Stock', updateProductData?.productData?.stock.toString());

    updateProductData?.productData?.images.forEach((image) => {
        myForm.append("images", image)
    })
    const payload = myForm
    try {
        dispatch(updateProductRequest())
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };
        const { data } = await axios.put(
            `/api/v1/admin/product/${updateProductData.id}`,
            payload,
            config
        );
        dispatch(updateProductSuccess(data.product));
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
export const newReview = (payload: ReviewData) => async (dispatch: Dispatch) => {
    try {
        dispatch(newReviewRequest());

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(`/api/v1/review`, payload, config);
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
        dispatch(allReviewSuccess(data.reviews));
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
