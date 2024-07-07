import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
    data: {
        category: [],
        course: [],
        cart: null,
        courseSelected: null,
        paymentStatus: null,
        myCourse: [],
        courseLearning: null,
    },
    loading: false,
    error: null,
};

export const getAllCategory = createAsyncThunk(
    "public/getAllCategory",
    async () => {
        try {
            const res = await axiosInstance.get("/public/api/category/getAll");
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message);
            return error.response?.data;
        }
    }
);

export const getAllCourse = createAsyncThunk(
    "public/getAllCourse",
    async () => {
        try {
            const res = await axiosInstance.get("/public/api/course/getAll");
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                toast.error("Lỗi hệ thống");
            }
        }
    }
);

export const getCourseById = createAsyncThunk(
    "public/getCourseById",
    async ({ id }) => {
        try {
            const res = await axiosInstance.get(`/public/api/course/${id}`);
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                toast.error("Lỗi hệ thống");
            }
        }
    }
);

export const checkPaymentStatus = createAsyncThunk(
    "public/checkPaymentStatus",
    async ({ url }) => {
        try {
            const res = await axiosInstance.get(url);
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                toast.error("Lỗi hệ thống");
            }
        }
    }
);

export const getMyCourse = createAsyncThunk(
    "getMyCourse",
    async ({ userId, accessToken }) => {
        try {
            const res = await axiosInstance.get(
                `/api/getAllCourse/enroll/${userId}`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message);
            return error.response?.data;
        }
    }
);

export const getCourseErollById = createAsyncThunk(
    "getCourseErollById",
    async ({ userId, courseId, accessToken }) => {
        try {
            const res = await axiosInstance.get(
                `/api/course/enroll/${userId}/${courseId}`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                toast.error("Lỗi hệ thống");
            }
        }
    }
);

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const findItem = state.cartList.find((i) => item?.id === i?.id);
            if (findItem) {
                const newCart = {
                    ...state,
                    cartList: state.cartList.map((i) =>
                        i?.id === item?.id ? item : i
                    ),
                };
                toast.info("Khoá học đã có trong giỏ hàng");
                return newCart;
            } else {
                const newCart = {
                    ...state,
                    cartList: [...state.cartList, item],
                };
                toast.success("Đã thêm khoá học vào giỏ hàng");
                return newCart;
            }
        },

        removeFromCart: (state, action) => {
            const item = action.payload;
            const findItem = state.cartList.find((i) => i.id === item.id);
            if (findItem) {
                const newList = state.cartList.filter((i) => i.id !== item.id);
                const newCart = {
                    ...state,
                    cartList: newList,
                };
                return newCart;
            }
        },

        clearCart: (state) => {
            state.cartList = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data.category = action.payload?.data?.all_category;
            })
            .addCase(getAllCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.data.course = action.payload?.data?.allCourse;
            })
            .addCase(getCourseById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCourseById.fulfilled, (state, action) => {
                state.loading = false;
                state.data.courseSelected = action.payload?.data?.course;
            })
            .addCase(getMyCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.data.myCourse = action.payload?.data?.listCourseEnroll;
            })
            .addCase(getCourseErollById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCourseErollById.fulfilled, (state, action) => {
                state.loading = false;
                state.data.courseLearning = action.payload?.data?.courseEnroll;
            });
    },
});

export default appSlice;
