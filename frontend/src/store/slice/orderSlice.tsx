import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserProfile } from "../../types/userTypes";
import { ShippingInfo } from "./cartSlice";

interface OrderState {
    loading: boolean;
    orders: Order[];
    order: Order | null;
    isUpdated: boolean;
    isDeleted: boolean;
    error: string | null;
}
export interface Order {
    orderItems: any[];
    orderStatus: string;
    totalPrice: number;
    _id: string;
    user: User | UserProfile | null
    shippingInfo: ShippingInfo
    paymentInfo: any
}
const initialState: OrderState = {
    loading: false,
    orders: [],
    order: null,
    isUpdated: false,
    isDeleted: false,
    error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        createOrderRequest(state) {
            state.loading = true;
        },
        createOrderSuccess(state, action: PayloadAction<Order>) {
            state.loading = false;
            state.order = action.payload;
        },
        createOrderFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors(state) {
            state.error = null;
        },
        myOrdersRequest(state) {
            state.loading = true;
        },
        myOrdersSuccess(state, action: PayloadAction<Order[]>) {
            state.loading = false;
            state.orders = action.payload;
        },
        myOrdersFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        allOrdersRequest(state) {
            state.loading = true;
        },
        allOrdersSuccess(state, action: PayloadAction<Order[]>) {
            state.loading = false;
            state.orders = action.payload;
        },
        allOrdersFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateOrderRequest(state) {
            state.loading = true;
        },
        deleteOrderRequest(state) {
            state.loading = true;
        },
        updateOrderSuccess(state, action: PayloadAction<boolean>) {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        deleteOrderSuccess(state, action: PayloadAction<boolean>) {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        updateOrderFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteOrderFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateOrderReset(state) {
            state.isUpdated = false;
        },
        deleteOrderReset(state) {
            state.isDeleted = false;
        },
        orderDetailsRequest(state) {
            state.loading = true;
        },
        orderDetailsSuccess(state, action: PayloadAction<Order>) {
            state.loading = false;
            state.order = action.payload;
        },
        orderDetailsFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,

    clearErrors,
    myOrdersRequest,
    myOrdersSuccess,
    myOrdersFail,

    allOrdersRequest,
    allOrdersSuccess,
    allOrdersFail,

    updateOrderRequest,
    updateOrderSuccess,

    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFail,
    deleteOrderReset,

    updateOrderFail,
    updateOrderReset,

    orderDetailsRequest,
    orderDetailsSuccess,
    orderDetailsFail,
} = orderSlice.actions;

export default orderSlice.reducer;
