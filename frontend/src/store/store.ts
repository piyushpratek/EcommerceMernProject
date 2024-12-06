import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { deleteReviewSlice } from './slice/Products/deleteReviewSlice';
import { newProductSlice } from './slice/Products/newProductSlice';
import { newReviewSlice } from './slice/Products/newReviewSlice';
import { productDetailsSlice } from './slice/Products/productDetailsSlice';
import { productReviewsSlice } from './slice/Products/productReviewsSlice';
import { productsSlice } from './slice/Products/allProductsSlice';
import { updateDeleleteproductSlice } from './slice/Products/updateDeleteProductSlice';
import { cartSlice } from './slice/cartSlice';
import { orderSlice } from './slice/orderSlice';
import { userSlice } from './slice/user/userSlice';
import { allUsersSlice } from './slice/user/allUsersSlice';
import { userDetailsSlice } from './slice/user/userDetailsSlice';
export const store = configureStore({
    reducer: {
        ...([
            productsSlice,
            newProductSlice,
            updateDeleleteproductSlice,
            productDetailsSlice,
            newReviewSlice,
            productReviewsSlice,
            deleteReviewSlice,
            cartSlice,
            orderSlice,
            userSlice,
            allUsersSlice,
            userDetailsSlice
        ].reduce((acc, slice) => {
            acc[slice.name] = slice.reducer
            return acc
        }, {})),
    },
    // Other store configurations if needed...
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export type getStateType = () => RootState
export default store;
