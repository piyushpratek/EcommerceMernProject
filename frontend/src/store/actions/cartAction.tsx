import { Dispatch, createAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from "axios";
import { RootState } from "../store";
import { addToCart, removeCartItem } from '../slice/cartSlice';



interface AddToCartPayload {
    product: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    quantity: number;
}

interface RemoveCartItemPayload {
    id: string;
}

interface SaveShippingInfoPayload {
    // Define the properties for shipping info
    // For example:
    address: string;
    city: string;
}



// Wrapper function to manually dispatch actions
export const addItemsToCart = (id: string, quantity: number) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        const { data } = await axios.get(`/api/v1/product/${id}`);

        const payload: AddToCartPayload = {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity: quantity,
        };

        dispatch(addToCart(payload));
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        // Handle error if necessary
    }
};

export const removeItemsFromCart = (id: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        dispatch(removeCartItem({ id }));
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        // Handle error if necessary
    }
};

export const saveShippingInfo = (data: SaveShippingInfoPayload) => async (dispatch: Dispatch) => {
    try {
        dispatch(saveShippingInfo(data));
        localStorage.setItem("shippingInfo", JSON.stringify(data));
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const message = axiosError?.response?.data?.message || "Error Occurred";
        // Handle error if necessary
    }
};
