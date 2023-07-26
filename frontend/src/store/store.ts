// store.ts
import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slice/productSlice';

export const store = configureStore({
    reducer: {
        products: productSlice
    },
    // Other store configurations if needed...
});

export default store;
