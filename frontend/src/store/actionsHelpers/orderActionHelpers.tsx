import axios, { AxiosError } from "axios";
import { createOrderRequest, createOrderSuccess, createOrderFail, myOrdersRequest, myOrdersSuccess, myOrdersFail, allOrdersRequest, allOrdersSuccess, allOrdersFail, updateOrderRequest, updateOrderSuccess, updateOrderFail, deleteOrderRequest, deleteOrderSuccess, deleteOrderFail, orderDetailsRequest, orderDetailsSuccess, orderDetailsFail, clearErrors } from "../slice/orderSlice";
import { Dispatch } from '@reduxjs/toolkit';

// TODO
export interface Order {
    shippingInfo: any,
    orderItems: any,
    paymentInfo: any,
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
}

interface ErrorResponse {
    message: string;
}

// Create Order
export const createOrder = (payload: Order) => async (dispatch: Dispatch) => {
    try {
        dispatch(createOrderRequest());

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/order/new", payload, config);

        dispatch(createOrderSuccess(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(createOrderFail(message))
    }
};

// My Orders
export const myOrders = () => async (dispatch: Dispatch) => {
    try {
        dispatch(myOrdersRequest());

        const { data } = await axios.get("/api/v1/orders/me");

        dispatch(myOrdersSuccess(data.orders));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(myOrdersFail(message));
    }
};

// Get Order Details
export const getOrderDetails = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(orderDetailsRequest());

        const { data } = await axios.get(`/api/v1/order/${id}`);

        dispatch(orderDetailsSuccess(data.order));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(orderDetailsFail(message));
    }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch: Dispatch) => {
    try {
        dispatch(allOrdersRequest());

        const { data } = await axios.get("/api/v1/admin/orders");

        dispatch(allOrdersSuccess(data.orders));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(allOrdersFail(message));
    }
};

// Update Order
export const updateOrder = (id: string, status: string) => async (dispatch: Dispatch) => {
    const myForm = new FormData();
    myForm.set('status', status);
    const payload = myForm
    try {
        dispatch(updateOrderRequest());

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(`/api/v1/admin/order/${id}`, payload, config);

        dispatch(updateOrderSuccess(data.success));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(updateOrderFail(message));
    }
};

// Delete Order
export const deleteOrder = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(deleteOrderRequest());

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

        dispatch(deleteOrderSuccess(data.success));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        dispatch(deleteOrderFail(message));
    }
};

// Clearing Errors
export const clearAllErrors = () => async (dispatch: Dispatch) => {
    dispatch(clearErrors());
};