import { Layout } from "antd";
import HeaderCustom from "../../Header/Header";
import FooterCustom from "../../Footer/Footer";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../config/axiosInstance";

function DefaultLayout() {
    const loading = useSelector((state) => state.auth.loading);
    const [spinning, setSpinning] = useState(loading);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        setSpinning(loading);
    }, [loading]);

    // useEffect(async () => {
    //     try {
    //         const res = await axiosInstance.get("/public/api/category/getAll");
    //         setCategories(res.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, []);
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <HeaderCustom />
            <Content
                style={{
                    paddingLeft: 50,
                    paddingRight: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                }}>
                <Outlet />
            </Content>
            <FooterCustom />
            <Spin spinning={spinning} fullscreen />
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
        </Layout>
    );
}

export default DefaultLayout;
