import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    id: string;
    accessToken: string;
    refreshToken: string;
    isLogin: boolean;
    loading: boolean;
    firstName:string;
    lastName:string;
    email:string;
}

const initialState: UserState = {
    id: "",
    firstName:"",
    email:"",
    lastName:"",
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
