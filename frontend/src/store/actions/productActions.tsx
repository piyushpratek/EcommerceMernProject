// productActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductData, ReviewData } from './productTypes';

// Define your async thunks for API calls
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_params, { rejectWithValue }) => {
    try {
        // Replace 'api/products' with the appropriate API endpoint
        const response = await axios.get('api/products');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addProduct = createAsyncThunk('products/addProduct', async (productData: ProductData, { rejectWithValue }) => {
    try {
        // Replace 'api/products' with the appropriate API endpoint
        const response = await axios.post('api/products', productData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// ... Define other async thunks for your other actions ...
