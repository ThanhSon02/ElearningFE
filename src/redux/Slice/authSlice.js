import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ loginRequest, navigate, type }) => {
        try {
            const res = await axiosInstance.post(
                "/public/api/auth/login",
                loginRequest
            );
            Cookies.set("token", res.data?.data?.token);
            if (type === "1") {
                navigate("/");
            } else {
                navigate("/admin/dashboard");
            }
            toast.success(res.data?.message);
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message);
            return error.response?.data;
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
            navigate("/login");
            toast.success(res.data?.message);
            return res.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return error.response.data;
        }
    }
);

export const changePassword = createAsyncThunk(
    "user/changePassword",
    async ({ dataChange, accessToken }) => {
        try {
            const res = await axiosInstance.post(
                "/api/user/password",
                dataChange,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            toast.success(res.data?.message);
        } catch (error) {
            toast.error(error.response.data?.message);
            return error.response.data;
        }
    }
);

export const logOut = createAsyncThunk("auth/logout", ({ navigate }) => {
    Cookies.remove("token");
    navigate("/");
    toast.success("Bạn đã đăng xuất!");
});

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
                state.data = action.payload?.data;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
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
            })
            .addCase(logOut.pending, (state) => {
                state.loading = true;
                state.message = null;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.loading = false;
                state.data = null;
            })
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
            });
    },
});

export default authSlice;
