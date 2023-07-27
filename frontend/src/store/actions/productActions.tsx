import axios, { AxiosError } from "axios"
import { Action, Dispatch } from 'redux';

import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS } from "../slice/productSlice"
import { ThunkAction } from 'redux-thunk'; // Import ThunkAction type
import { RootState } from "../store";


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

//get All Products
export const getProduct = (params: GetProductParams): ThunkAction<void, RootState, unknown, Action> => async (dispatch: Dispatch) => {
    try {
        dispatch(ALL_PRODUCT_REQUEST())
        const { keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0 } = params

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const { data } = await axios.get(link);

        dispatch(ALL_PRODUCT_SUCCESS(data));
    }
    catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(ALL_PRODUCT_FAIL(message));
    }
};


// Clearing Errors
export const clearErrors = () => async (dispatch: Dispatch) => {
    dispatch(CLEAR_ERRORS);
};

