import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//product interface
interface Product {
    _id: string;
    name: string;
    images: { url: string }[];
    price: string;
    ratings: number;
    numOfReviews: number;
    reviews: Review[];
    // ... other fields
}

// Products state interface
interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
    productsCount?: number;
    resultPerPage?: number;
    filteredProductsCount?: number;
}

// New product state interface
interface NewProductState {
    product: Product;
    loading: boolean;
    error: string | null;
    success: boolean;
}

// Product details state interface
interface ProductDetailsState {
    product: Product | null;
    loading: boolean;
    error: string | null;
}

// New review state interface
interface NewReviewState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

// Product reviews state interface
interface Review {
    _id: string;
    productId: string;
    rating: number;
    comment: string;
    user: string;
    createdAt: string;
}

interface ProductReviewsState {
    reviews: Review[]; // Replace `any[]` with the actual type for reviews
    loading: boolean;
    error: string | null;
}

// Review state interface
interface ReviewState {
    loading: boolean;
    error: string | null;
    isDeleted: boolean;
}

interface UpdateDeleteProductState {
    loading: boolean;
    error: string | null;
    isDeleted: boolean;
    isUpdated: boolean;
}


const initialProductsState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};

const initialNewProductState: NewProductState = {
    product: {
        _id: "",
        name: "",
        images: [],
        price: "",
        ratings: 0,
        numOfReviews: 0,
        reviews: []
    },
    loading: false,
    error: null,
    success: false,
};

const initialProductDetailsState: ProductDetailsState = {
    product: {
        _id: "",
        name: "",
        images: [],
        price: "",
        ratings: 0,
        numOfReviews: 0,
        reviews: []
    },
    loading: false,
    error: null,
};

const initialNewReviewState: NewReviewState = {
    loading: false,
    error: null,
    success: false,
};

const initialProductReviewsState: ProductReviewsState = {
    reviews: [],
    loading: false,
    error: null,
};

const initialReviewState: ReviewState = {
    loading: false,
    error: null,
    isDeleted: false,
};


const initialUpdateDeleteProductState: UpdateDeleteProductState = {
    loading: false,
    error: null,
    isDeleted: false,
    isUpdated: false,
};


// ... (interfaces and initial states)

//All  Products  slice
const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        allProductRequest: (state) => {
            state.loading = true;
        },
        allProductSuccess: (state, action: PayloadAction<{
            products: Product[];
            productsCount: number;
            resultPerPage: number;
            filteredProductsCount: number;
        }>) => {
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productsCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductsCount = action.payload.filteredProductsCount;
        },
        adminProductSuccess: (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.products = action.payload;
        },
        allProductFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});


// New product reducer slice
const newProductSlice = createSlice({
    name: 'newProduct',
    initialState: initialNewProductState,
    reducers: {
        newProductRequest: (state) => {
            state.loading = true;
        },
        newProductSuccess: (state, action: PayloadAction<Product>) => {
            state.loading = false;
            state.success = true;
            state.product = action.payload;
        },
        newProductFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newProductReset: (state) => {
            state.success = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

//update/delete product
const updateDeleleteproductSlice = createSlice({
    name: 'updatedeleteproduct',
    initialState: initialUpdateDeleteProductState,
    reducers: {
        deleteProductRequest: (state) => {
            state.loading = true;
        },
        updateProductRequest: (state) => {
            state.loading = true;
        },
        deleteProductSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        updateProductSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        deleteProductFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateProductFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteProductReset: (state) => {
            state.isDeleted = false;
        },
        updateProductReset: (state) => {
            state.isUpdated = false;
        },
        clearProductErrors: (state) => {
            state.error = null;
        },
    },
});
//product details
const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: initialProductDetailsState,
    reducers: {
        productDetailsRequest: (state) => {
            state.loading = true;
        },
        productDetailsSuccess: (state, action: PayloadAction<Product>) => {
            state.loading = false;
            state.product = action.payload;
        },
        productDetailsFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

//new review
const newReviewSlice = createSlice({
    name: 'newReview',
    initialState: initialNewReviewState,
    reducers: {
        newReviewRequest: (state) => {
            state.loading = true;
        },
        newReviewSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.success = action.payload;
        },
        newReviewFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newReviewReset: (state) => {
            state.success = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

//product review
const productReviewsSlice = createSlice({
    name: 'productReviews',
    initialState: initialProductReviewsState,
    reducers: {
        allReviewRequest: (state) => {
            state.loading = true;
        },
        allReviewSuccess: (state, action: PayloadAction<Review[]>) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        allReviewFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

// delete review
const deleteReviewSlice = createSlice({
    name: 'deletereview',
    initialState: initialReviewState,
    reducers: {
        deleteReviewRequest: (state) => {
            state.loading = true;
        },
        deleteReviewSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteReviewFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteReviewReset: (state) => {
            state.isDeleted = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    allProductRequest,
    allProductSuccess,
    adminProductSuccess,
    allProductFail,
    clearErrors: clearProductsErrors,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;

export const {
    newProductRequest,
    newProductSuccess,
    newProductFail,
    newProductReset,
    clearErrors: clearNewProductErrors,
} = newProductSlice.actions;
export const newProductReducer = newProductSlice.reducer;

export const {
    deleteProductRequest,
    updateProductRequest,
    deleteProductSuccess,
    updateProductSuccess,
    deleteProductFail,
    updateProductFail,
    deleteProductReset,
    updateProductReset,
    clearProductErrors,
} = updateDeleleteproductSlice.actions;
export const updateDeleleteproductReducer = updateDeleleteproductSlice.reducer

export const {
    productDetailsRequest,
    productDetailsSuccess,
    productDetailsFail,
    clearErrors: clearProductDetailsErrors,
} = productDetailsSlice.actions;
export const productDetailsReducer = productDetailsSlice.reducer;

export const {
    newReviewRequest,
    newReviewSuccess,
    newReviewFail,
    newReviewReset,
    clearErrors: clearNewReviewErrors,
} = newReviewSlice.actions;
export const newReviewReducer = newReviewSlice.reducer;

export const {
    allReviewRequest,
    allReviewSuccess,
    allReviewFail,
    clearErrors: clearProductReviewsErrors,
} = productReviewsSlice.actions;
export const productReviewsReducer = productReviewsSlice.reducer;

export const {
    deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewFail,
    deleteReviewReset,
    clearErrors: clearReviewErrors,
} = deleteReviewSlice.actions;
export const deleteReviewReducer = deleteReviewSlice.reducer;
