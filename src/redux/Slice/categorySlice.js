import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export const getAllCategory = createAsyncThunk(
    "public/getAllCategory",
    async () => {
        try {
            const res = await axiosInstance.get("/public/api/category/getAll");
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
            return error.response?.data;
        }
    }
);

export const addCategory = createAsyncThunk(
    "admin/addCategory",
    async ({ categoryInfo, accessToken }) => {
        try {
            const res = await axiosInstance.post(
                "/api/category/save",
                categoryInfo,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            toast.success(res.data?.message);
            return res.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
            return error.response?.data;
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "admin/deleteCategory",
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

export const updateCategory = createAsyncThunk(
    "admin/updateCategory",
    ({ navigate }) => {
        Cookies.remove("token");
        navigate("/");
        toast.success("Bạn đã đăng xuất!");
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload?.data?.all_category;
            })
            .addCase(getAllCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categorySlice;
