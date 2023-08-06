// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


import cartSlice from './slice/cartSlice';
import orderSlice from './slice/orderSlice';
import userSlice from './slice/userSlice';
import { deleteReviewReducer } from './slice/Products/deleteReviewSlice';
import { newProductReducer } from './slice/Products/newProductSlice';
import { newReviewReducer } from './slice/Products/newReviewSlice';
import { productDetailsReducer } from './slice/Products/productDetailsSlice';
import { productReviewsReducer } from './slice/Products/productReviewsSlice';
import { productsReducer } from './slice/Products/allProductsSlice';
import { updateDeleleteproductReducer } from './slice/Products/updateDeleteProductSlice';
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
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// export type getStateType = () => RootState
export default store;
