// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';


import cartSlice from './slice/cartSlice';
import orderSlice from './slice/orderSlice';
import userSlice from './slice/userSlice';
import { deleteReviewReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReviewsReducer, productsReducer, updateDeleleteproductReducer } from './slice/productSlicecopy';
export const store = configureStore({
    reducer: {
        products: productsReducer,
        newProduct: newProductReducer,
        updatedeleteproduct: updateDeleleteproductReducer,
        productDetails: productDetailsReducer,
        newReview: newReviewReducer,
        productReviews: productReviewsReducer,
        deletereview: deleteReviewReducer,
        cart: cartSlice,
        order: orderSlice,
        user: userSlice

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
