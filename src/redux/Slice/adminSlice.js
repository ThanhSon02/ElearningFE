import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const initialState = {
    data: {
        allUserData: null,
        loginData: null,
        categoryData: null,
        courseData: [],
        sectionData: [],
        lectureData: [],
        orderData: [],
    },
    loading: false,
    error: null,
};

// User section start
export const getAllUser = createAsyncThunk(
    "admin/getAllUser",
    async ({ accessToken, navigate }) => {
        try {
            const res = await axiosInstance.get("/api/user/getAllUser", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

export const loginAdminUser = createAsyncThunk(
    "admin/login",
    async ({ loginRequest, navigate, type }) => {
        try {
            const res = await axiosInstance.post(
                "/public/api/auth/login",
                loginRequest
            );
            Cookies.set("tokenAdmin", res.data?.data?.token);
            if (type === "1") {
                navigate("/");
            } else {
                navigate("/admin/dashboard");
            }
            toast.success(res.data?.message);
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

export const updateUserInfo = createAsyncThunk(
    "admin/updateInfo",
    async ({ userInfo, navigate, accessToken }) => {
        try {
            const res = await axiosInstance.put("/api/user/update", userInfo, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            toast.success(res.data?.message);
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

export const logOutAdmin = createAsyncThunk("admin/logout", ({ navigate }) => {
    Cookies.remove("tokenAdmin");
    navigate("/admin/auth/login");
    toast.success("Bạn đã đăng xuất!");
});

// User section end

// Category section start
export const getAllCategoryAdmin = createAsyncThunk(
    "admin/getAllCategory",
    async ({ navigate }) => {
        try {
            const res = await axiosInstance.get("/public/api/category/getAll");
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
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
            toast.error(error.response?.data?.message);
            return error.response?.data;
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "admin/deleteCategory",
    async ({ categoryId, navigate, accessToken }) => {
        try {
            const res = await axiosInstance.delete(
                `/api/category/delete/${categoryId}`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            toast.success(res.data?.message);
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

export const updateCategory = createAsyncThunk(
    "admin/updateCategory",
    async ({ categoryData, navigate, accessToken }) => {
        try {
            const res = await axiosInstance.put(
                "/api/category/update",
                categoryData,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            toast.success(res.data?.message);
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

// Category section end

// Course section start
export const addCourse = createAsyncThunk(
    "admin/addCourse",
    async ({ courseData, navigate, accessToken }) => {
        try {
            const res = await axiosInstance.post(
                "/api/course/add",
                courseData,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            toast.success(res.data?.message);
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

export const getAllCourseAdmin = createAsyncThunk(
    "admin/getAllCourse",
    async ({ navigate }) => {
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
                navigate("/admin/auth/login");
            }
        }
    }
);

export const deleteCourse = createAsyncThunk(
    "admin/deleteCourse",
    async ({ courseId, navigate, accessToken }) => {
        try {
            const res = await axiosInstance.delete(
                `/api/course/delete/${courseId}`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            toast.success(res.data?.message);
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

export const updateCourse = createAsyncThunk(
    "admin/updateCourse",
    async ({ courseData, navigate, accessToken }) => {
        try {
            const res = await axiosInstance.put(
                "/api/course/update",
                courseData,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

// Course section end

//Course section end

// Section start
export const addSection = createAsyncThunk(
    "admin/addSection",
    async ({ sectionData, navigate, accessToken }) => {
        try {
            const res = await axiosInstance.post(
                "/api/section/save",
                sectionData,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            toast.success(res.data?.message);
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

export const getAllSection = createAsyncThunk(
    "admin/getAllSection",
    async ({ navigate, accessToken }) => {
        try {
            const res = await axiosInstance.get("/api/section/getAll", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

export const deleteSection = createAsyncThunk(
    "admin/deleteSection",
    async ({ sectionId, navigate, accessToken }) => {
        try {
            const res = await axiosInstance.delete(
                `/api/section/delete/${sectionId}`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

export const updateSection = createAsyncThunk(
    "admin/updateSection",
    async ({ sectionData, navigate, accessToken }) => {
        try {
            const res = await axiosInstance.put(
                "/api/section/update",
                sectionData,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

// Section end

// Lecture start
export const getAllLecture = createAsyncThunk(
    "admin/getAllLecture",
    async ({ navigate, accessToken }) => {
        try {
            const res = await axiosInstance.get("/api/lecture/getAll", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

export const addLecture = createAsyncThunk(
    "admin/addLecture",
    async ({ lectureData, navigate, accessToken }) => {
        try {
            const res = await axiosInstance.post(
                "/api/lecture/save",
                lectureData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success(res.data?.message);
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

export const deleteLecture = createAsyncThunk(
    "admin/deleteLecture",
    async ({ lectureId, navigate, accessToken }) => {
        try {
            const res = await axiosInstance.delete(
                `/api/lecture/delete/${lectureId}`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

export const updateLecture = createAsyncThunk(
    "admin/updateLecture",
    async ({ lectureData, navigate, accessToken }) => {
        try {
            const res = await axiosInstance.put(
                "/api/lecture/update",
                lectureData,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            toast.success(res.data?.message);
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

export const getAllOrder = createAsyncThunk(
    "admin/getAllOrder",
    async ({ accessToken, navigate }) => {
        try {
            const res = await axiosInstance.get("/api/order/getAll", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return res.data;
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
            if (error.response?.data?.access_denied_reason) {
                navigate("/admin/auth/login");
            }
        }
    }
);

// Lecture end
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // User & Login
            .addCase(getAllUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data.allUserData = action.payload?.data;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginAdminUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAdminUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data.loginData = action.payload?.data;
            })
            .addCase(loginAdminUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logOutAdmin.pending, (state) => {
                state.loading = true;
                state.message = null;
            })
            .addCase(logOutAdmin.fulfilled, (state) => {
                state.loading = false;
                state.data.user = null;
            })
            // Category
            .addCase(getAllCategoryAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCategoryAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.data.categoryData = action.payload?.data?.all_category;
            })
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                const temp = [
                    ...state.data.categoryData,
                    action.payload?.data?.category,
                ];
                state.data.categoryData = temp;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                const temp = state.data.categoryData.filter(
                    (category) =>
                        category.id != action.payload?.data?.categoryDeleted
                );
                state.data.categoryData = temp;
            })
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data.categoryData.some((category, index) => {
                    if (
                        category.id ===
                        action.payload?.data?.categoryUpdated?.id
                    ) {
                        state.data.categoryData[index] =
                            action.payload?.data?.categoryUpdated;

                        return true;
                    }
                    return false;
                });
            })
            // Course
            .addCase(addCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCourse.fulfilled, (state, action) => {
                state.loading = false;
                const temp = [
                    ...state.data.courseData,
                    action.payload?.data?.courseSaved,
                ];
                state.data.courseData = temp;
            })
            .addCase(getAllCourseAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCourseAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.data.courseData = action.payload?.data?.allCourse;
            })
            .addCase(deleteCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.loading = false;
                const courseId = action.payload?.data?.courseDeleted?.id;
                console.log(courseId);
                const temp = state.data.courseData.filter(
                    (course) => course.id != courseId
                );
                state.data.courseData = temp;
            })
            .addCase(updateCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.data.courseData.some((course, index) => {
                    if (course.id === action.payload?.data?.courseUpdated?.id) {
                        state.data.courseData[index] =
                            action.payload?.data?.courseUpdated;

                        return true;
                    }
                    return false;
                });
            })
            //Section
            .addCase(addSection.pending, (state) => {
                state.loading = true;
            })
            .addCase(addSection.fulfilled, (state, action) => {
                state.loading = false;
                const temp = [
                    ...state.data.sectionData,
                    action.payload?.data?.sectionSaved,
                ];
                state.data.sectionData = temp;
            })
            .addCase(getAllSection.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllSection.fulfilled, (state, action) => {
                state.loading = false;
                state.data.sectionData = action.payload?.data?.sections;
            })
            .addCase(deleteSection.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSection.fulfilled, (state, action) => {
                state.loading = false;
                const temp = state.data.sectionData.filter(
                    (section) =>
                        section.sectionId !=
                        action.payload?.data?.sectionDeleted?.sectionId
                );
                state.data.sectionData = temp;
            })
            .addCase(updateSection.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSection.fulfilled, (state, action) => {
                state.loading = false;
                state.data.sectionData.some((section, index) => {
                    if (
                        section.sectionId ===
                        action.payload?.data?.sectionUpdated?.sectionId
                    ) {
                        state.data.sectionData[index] =
                            action.payload?.data?.sectionUpdated;

                        return true;
                    }
                    return false;
                });
            })
            // Lecture
            .addCase(addLecture.pending, (state) => {
                state.loading = true;
            })
            .addCase(addLecture.fulfilled, (state, action) => {
                state.loading = false;
                const temp = [
                    ...state.data.lectureData,
                    action.payload?.data?.lectureSaved,
                ];
                state.data.lectureData = temp;
            })
            .addCase(getAllLecture.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllLecture.fulfilled, (state, action) => {
                state.loading = false;
                state.data.lectureData = action.payload?.data?.allLecture;
            })
            .addCase(deleteLecture.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteLecture.fulfilled, (state, action) => {
                state.loading = false;
                const temp = state.data.lectureData.filter(
                    (lecture) =>
                        lecture.id != action.payload?.data?.lectureDeleted
                );
                state.data.lectureData = temp;
            })
            .addCase(updateLecture.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateLecture.fulfilled, (state, action) => {
                state.loading = false;
                state.data.lectureData.some((lecture, index) => {
                    if (
                        lecture.id === action.payload?.data?.lectureUpdated?.id
                    ) {
                        state.data.lectureData[index] =
                            action.payload?.data?.lectureUpdated;

                        return true;
                    }
                    return false;
                });
            })
            .addCase(getAllOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.data.orderData = action.payload?.data?.allOrders;
            });
    },
});

export default adminSlice;
