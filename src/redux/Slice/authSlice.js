import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ loginRequest, navigate }) => {
        try {
            const res = await axiosInstance.post(
                "/public/api/auth/login",
                loginRequest
            );
            return res.data;
        } catch (error) {
            console.log(error);
            toast.error(error.respose?.data?.message);
            return error.respose?.data;
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async ({ registerRequest, navigate }) => {
        try {
            const res = await axiosInstance.post(
                "/public/api/auth/register",
                registerRequest
            );
            if (200 == res.status) {
                navigate("/login");
                toast.success(res.data.message);
                return res.data.data;
            }
        } catch (error) {
            toast.error(error.respose.data.message);
            return error.respose.data;
        }
    }
);

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action;
                console.log(action);
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { updateAccessToken } = authSlice.actions;
export default authSlice;
