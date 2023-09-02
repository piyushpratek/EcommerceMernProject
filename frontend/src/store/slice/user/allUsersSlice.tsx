import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AllUsersData } from "../../../types/userTypes";

interface AllUsersState {
    loading: boolean;
    success: boolean | null;
    error: string | null;
    users: User[];
    isDeleted: boolean;
    message: string | null;
}

const initialState: AllUsersState = {
    loading: true,
    success: null,
    error: null,
    users: [],
    isDeleted: false,
    message: null,
};

const allUsersSlice = createSlice({
    name: "allUsers",
    initialState,
    reducers: {
        allUsersRequest(state) {
            state.loading = true;
        },
        allUsersSuccess(state, action: PayloadAction<AllUsersData>) {
            state.loading = false;
            state.users = action.payload;
        },
        allUsersFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    allUsersRequest,
    allUsersSuccess,
    allUsersFail,
} = allUsersSlice.actions;

export default allUsersSlice.reducer