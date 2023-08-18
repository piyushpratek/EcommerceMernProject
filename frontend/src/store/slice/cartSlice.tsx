import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the cart item
interface CartItem {
    product: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    quantity: number;
}

// Define the type for the shipping information
interface ShippingInfo {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    phoneNo: string
}

// Define the initial state
interface CartState {
    cartItems: CartItem[];
    shippingInfo: ShippingInfo;
}

const initialState: CartState = {
    cartItems: [],
    shippingInfo: {} as ShippingInfo, // Initialize an empty object, can be modified later
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload;
            const isItemExist = state.cartItems.find((i) => i.product === item.product);

            if (isItemExist) {
                state.cartItems = state.cartItems.map((i) =>
                    i.product === isItemExist.product ? item : i
                );
            } else {
                state.cartItems.push(item);
            }
        },

        removeCartItem: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
        },

        saveShippingInfoAction: (state, action: PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload;
        },
    },
});

export const { addToCart, removeCartItem, saveShippingInfoAction } = cartSlice.actions;
export default cartSlice.reducer;
