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
            </Route>
        </Routes>
    );
}

export default App;