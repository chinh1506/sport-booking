import { userService } from "@/api";
import { JwtToken } from "@/interfaces/JwtToken";
import { User } from "@/interfaces/User";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export interface UserState {
    id: string;
    accessToken: string;
    refreshToken: string;
    isLogin: boolean;
    loading: boolean;
    firstName: string;
    lastName: string;
    email: string;
    error?:string;
}

const initialState: UserState = {
    id: "",
    firstName: "",
    email: "",
    lastName: "",
    accessToken: "",
    refreshToken: "",
    isLogin: false,
    loading: false,
    
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
    extraReducers(builder) {
        builder
            .addCase(loadUserAction.fulfilled, (state, action) => {
                state.isLogin = true;
                state.loading = false;
                state = { ...state, ...action.payload };
            })
            .addCase(loadUserAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadUserAction.rejected, (state, action) => {
                console.log("Reject signout");
                
                state.isLogin = false;
                state.loading=false;
                state.error=action.error.message;
            });
    },
});

export const loadUserAction = createAsyncThunk("auth/loadUser", async (token: JwtToken, thunkApi) => {
    try {
        // setCookie(token)
        const user = await userService.getUserInfor();
        return user;
    } catch (error) {
        console.log("Load user err");
        console.log(error);
        return Promise.reject(error);
        
    }
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
