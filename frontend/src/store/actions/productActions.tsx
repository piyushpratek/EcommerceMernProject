

import { Action, Dispatch, ThunkAction, createAsyncThunk } from "@reduxjs/toolkit";
import { setProductsListSuccess, setProductsListFailed, setProductsListLoading } from "../slice/productSlice"
import axios, { AxiosError } from "axios"
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
        dispatch(setProductsListLoading())
        // const { keyword = "", currentPage = 1, price = [0, 25000],ratings = 0, category  } = params
        const { category } = params

        let link = `/api/v1/products`;

        if (category) {
            link = `/api/v1/products`;
        }

        const { data } = await axios.get(link);

        dispatch(setProductsListSuccess(data));
    }
    catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(setProductsListFailed(message));
    }
};
export const getAdminProduct = createAsyncThunk(
    "products/getAdminProduct",
    async () => {
        try {
            const response = await axios.get("/api/v1/admin/products");
            return response.data.products;
        } catch (error) {
            // throw error.response.data.message;
        }
    }
);









