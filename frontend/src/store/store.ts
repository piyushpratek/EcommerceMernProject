// store.ts
import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slice/productSlice';

export const store = configureStore({
    reducer: {
        products: productSlice
    },
    // Other store configurations if needed...
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type getStateType = () => RootState
export default store;
