import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home/Home";
import DefaultLayout from "./components/Layout/DefaultLayout/DefaultLayout";
import Login from "./page/Auth/Login";
import Register from "./page/Auth/Register";
import Category from "./page/Category/Category";
import Profile from "./page/Profile/Profile";
import MyCourse from "./page/MyCourse/MyCourse";
import CartPage from "./page/Cart/CartPage";
import Detail from "./page/Detail/Detail";
import LoginAdmin from "./page/Admin/LoginAdmin/LoginAdmin";
import AdminDashBoard from "./page/Admin/AdminDashBoard/AdminDashBoard";
import AdminCourse from "./page/Admin/AdminCourse/AdminCourse";
import AdminUser from "./page/Admin/AdminUser/AdminUser";
import AdminCategory from "./page/Admin/AdminCategory/AdminCategory";
import AdminProtectedLayout from "./components/Layout/ProtectedLayout/AdminProtectedLayout";

function App() {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/category" element={<Category />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my_course" element={<MyCourse />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/detail/:id" element={<Detail />} />
            </Route>
            <Route path="/admin/auth/login" element={<LoginAdmin />} />
            <Route element={<AdminProtectedLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashBoard />} />
                <Route path="/admin/course" element={<AdminCourse />} />
                <Route path="/admin/user" element={<AdminUser />} />
                <Route path="/admin/category" element={<AdminCategory />} />
            </Route>
        </Routes>
    );
}

export default App;
