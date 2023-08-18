import { Dispatch } from '@reduxjs/toolkit';
import axios from "axios";
import { RootState } from "../store";
import { addToCart, removeCartItem, saveShippingInfoAction } from '../slice/cartSlice';

interface AddToCartPayload {
    product: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    quantity: number;
}

interface SaveShippingInfoPayload {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    phoneNo: string
}

// Add to Cart
export const addItemsToCart = (id: string, quantity: number) => async (dispatch: Dispatch, getState: () => RootState) => {

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

};

//Remove from cart
export const removeItemsFromCart = (id: string) => async (dispatch: Dispatch, getState: () => RootState) => {

    dispatch(removeCartItem(id));
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

//Save Shipping Info
export const saveShippingInfo = (data: SaveShippingInfoPayload) => async (dispatch: Dispatch) => {

    dispatch(saveShippingInfoAction(data));
    localStorage.setItem("shippingInfo", JSON.stringify(data));

};
