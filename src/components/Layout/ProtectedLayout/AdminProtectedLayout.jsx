import { Layout, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HeaderAdmin from "../../Admin/HeaderAdmin/HeaderAdmin";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import SiderAdmin from "../../Admin/SiderAdmin/SiderAdmin";

function AdminProtectedLayout() {
    const loading = useSelector((state) => state.auth.loading);
    const [spinning, setSpinning] = useState(loading);

    useEffect(() => {
        setSpinning(loading);
    }, [loading]);

    if (true) {
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <HeaderAdmin />
                <Layout>
                    <Sider className="">
                        <SiderAdmin />
                    </Sider>
                    <Content
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "start",
                        }}>
                        <Outlet />
                    </Content>
                </Layout>
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
    } else {
        return (
            <div
                style={{
                    width: "100%",
                    height: 542,
                    fontSize: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <span>Bạn không có quyền truy cập trang này</span>
            </div>
        );
    }
}

export default AdminProtectedLayout;
