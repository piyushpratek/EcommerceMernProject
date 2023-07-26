import axios from "axios"
import { Dispatch } from 'redux';

import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS } from "../slice/productSlice"
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";



// Defining the parameters that the action accepts
interface GetProductParams {
    keyword?: string;
    currentPage?: number;
    price?: [number, number];
    category?: string;
    ratings?: number;
}

export const getProduct =

    async (params: GetProductParams, dispatch: Dispatch) => {
        try {
            const { keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0 } = params
            dispatch({ type: ALL_PRODUCT_REQUEST });

            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

            if (category) {
                link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
            }

            const { data } = await axios.get(link);

            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: ((error).response?.data.message as string) || "Error Occurred",
            });
        }
    };


// Clearing Errors
export const clearErrors = () => async (dispatch: (arg0: { type: ActionCreatorWithoutPayload<"products/CLEAR_ERRORS">; }) => void) => {
    dispatch({ type: CLEAR_ERRORS });
};

