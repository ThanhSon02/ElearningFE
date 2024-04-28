import { Layout, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HeaderAdmin from "../../Admin/HeaderAdmin/HeaderAdmin";
import FooterCustom from "../../Footer/Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ProtectedLayout() {
    const loading = useSelector((state) => state.auth.loading);
    const [spinning, setSpinning] = useState(loading);

    useEffect(() => {
        setSpinning(loading);
    }, [loading]);
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Outlet />
            </Content>
            <Spin spinning={spinning} fullscreen />
            <ToastContainer />
        </Layout>
    );
}

export default ProtectedLayout;
