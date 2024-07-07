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
import AdminProtectedLayout from "./components/Layout/AdminProtectedLayout/AdminProtectedLayout";
import ProtectedLayout from "./components/Layout/ProtectedLayout/ProtectedLayout";
import Payment from "./page/Payment/Payment";
import AdminCreateCourse from "./page/Admin/AdminCourse/AdminCreateCourse";
import AdminSection from "./page/Admin/AdminSection/AdminSection";
import AdminLecture from "./page/Admin/AdminLecture/AdminLecture";
import AdminOrder from "./page/Admin/AdminOrder/AdminOrder";
import Learning from "./page/Learning/Learning";
import AdminUpdateCourse from "./page/Admin/AdminCourse/AdminUpdateCourse";
import PaymentResult from "./page/PaymentResult/PaymentResult";

function App() {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/category" element={<Category />} /> */}
                <Route path="/category/:id" element={<Category />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/learning/:id" element={<Learning />} />
            </Route>
            <Route element={<ProtectedLayout />}>
                <Route path="/my_course" element={<MyCourse />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment/result" element={<PaymentResult />} />
            </Route>
            <Route path="/admin/auth/login" element={<LoginAdmin />} />
            <Route element={<AdminProtectedLayout />}>
                <Route
                    index
                    path="/admin/dashboard"
                    element={<AdminDashBoard />}
                />
                <Route path="/admin/course">
                    <Route index element={<AdminCourse />} />
                    <Route path="create" element={<AdminCreateCourse />} />
                    <Route path="update/:id" element={<AdminUpdateCourse />} />
                </Route>
                <Route path="/admin/section" element={<AdminSection />} />
                <Route path="/admin/lecture" element={<AdminLecture />} />
                <Route path="/admin/user" element={<AdminUser />} />
                <Route path="/admin/category" element={<AdminCategory />} />
                <Route path="/admin/order" element={<AdminOrder />} />
            </Route>
        </Routes>
    );
}

export default App;
