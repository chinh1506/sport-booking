import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    id: string;
    accessToken: string;
    refreshToken: string;
    isLogin: boolean;
    loading: boolean;
}

const initialState: UserState = {
    id: "",
    accessToken: "",
    refreshToken: "",
    isLogin: false,
    loading: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isLogin = true;
        },
        logout: (state) => {
            state.isLogin = false;
        },
    },
});

export const loadUserAction = createAsyncThunk("auth/loadUser", (_, thunkApi) => {

});

// Action creators are generated for each case reducer function 
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
