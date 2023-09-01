import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserProfile } from "../../types/userTypes";

//Todo rename this to updateUserSlice 
interface UsersDetailsState {
    loading: boolean;
    success: boolean | null;
    error: string | null;
    user: User | UserProfile | null;
    //Todo check below fields rae used or not 
    // isDeleted: boolean;
    // message: string | null;
}
//am back.. still there ?
const initialState: UsersDetailsState = {
    loading: true,
    success: null,
    error: null,
    user: null,
    // isDeleted: false,
    // message: null,
};

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        userDetailsRequest(state) {
            state.loading = true;
        },
        userDetailsSuccess(state, action: PayloadAction<UserProfile>) {
            state.loading = false;
            state.user = action.payload;
        },
        userDetailsFail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    userDetailsRequest,
    userDetailsSuccess,
    userDetailsFail,
} = userDetailsSlice.actions;

export default userDetailsSlice.reducer