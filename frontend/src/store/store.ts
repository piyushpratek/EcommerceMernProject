// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import productSlicecopy from './slice/productSlice';
import cartSlice from './slice/cartSlice';
export const store = configureStore({
    reducer: {
        product: productSlicecopy,
        cart: cartSlice

    },
    // Other store configurations if needed...
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// export type getStateType = () => RootState
export default store;
