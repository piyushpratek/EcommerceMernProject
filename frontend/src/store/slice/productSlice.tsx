import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductType {
    _id: string;
    name: string;
    images: { url: string }[];
    price: string;
    ratings: number;
    numOfReviews: number;
}

interface ProductStateType {
    products: ProductType[];
    loading: boolean;
    error: string | null;
    success: boolean;
    productsCount?: number;
    resultPerPage?: number;
    filteredProductsCount?: number;
}

const initialProductState: ProductStateType = {
    products: [],
    loading: false,
    error: null,
    success: false,
};

const productsSlice = createSlice({
    name: 'product',
    initialState: initialProductState,
    reducers: {
        setProductsListLoading: (state) => {
            state.loading = true;
            state.error = null;
            state.products = [];
        },
        setProductsListSuccess: (
            state,
            action: PayloadAction<{
                products: ProductType[];
                productsCount: number;
                resultPerPage: number;
                filteredProductsCount: number;
            }>
        ) => {
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productsCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductsCount = action.payload.filteredProductsCount;
            state.error = null;
        },
        setProductsListFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export const {
    setProductsListLoading,
    setProductsListSuccess,
    setProductsListFailed,
} = productsSlice.actions;
export default productsSlice.reducer;

