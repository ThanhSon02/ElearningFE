import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import HeaderCustom from "../../HeaderCustom/HeaderCustom";
import { Content } from "antd/es/layout/layout";
import { Layout, Spin } from "antd";
import FooterCustom from "../../FooterCustom/FooterCustom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

function ProtectedLayout() {
    const user = useSelector((state) => state.auth?.data.user);
    const loading = useSelector((state) => state.auth.loading);
    const [spinning, setSpinning] = useState(loading);

    useEffect(() => {
        setSpinning(loading);
    }, [loading]);
    if (user === null) {
        return <Navigate to={"/login"} />;
    }
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <HeaderCustom />
            <Content
                style={{
                    paddingLeft: 50,
                    paddingRight: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
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

export default ProtectedLayout;
