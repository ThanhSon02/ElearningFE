import { Layout } from "antd";
import HeaderCustom from "../../HeaderCustom/HeaderCustom";
// import FooterCustom from "../../FooterCustom/FooterCustom";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DefaultLayout() {
    const loading = useSelector((state) => state.auth.loading);
    const [spinning, setSpinning] = useState(loading);

    useEffect(() => {
        setSpinning(loading);
    }, [loading]);

    return (
        <Layout className="min-h-screen bg-[#efefef]">
            <HeaderCustom />
            <Layout
                className="w-full"
                style={{ minHeight: "calc(100vh - 64px)" }}>
                <Outlet />
            </Layout>
            {/* <FooterCustom /> */}
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
