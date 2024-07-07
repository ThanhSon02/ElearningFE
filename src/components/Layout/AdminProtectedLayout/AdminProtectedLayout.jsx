import { Layout, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HeaderAdmin from "../../Admin/HeaderAdmin/HeaderAdmin";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import SiderAdmin from "../../Admin/SiderAdmin/SiderAdmin";

function AdminProtectedLayout() {
    const loading = useSelector((state) => state.admin.loading);
    const [spinning, setSpinning] = useState(loading);

    const roles = useSelector(
        (state) => state.admin?.data?.loginData?.user?.roles
    );

    useEffect(() => {
        setSpinning(loading);
    }, [loading]);

    if (roles != null && roles[0]?.roleName === "ROLE_ADMIN") {
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    style={{
                        width: 200,
                        overflow: "auto",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 20,
                    }}>
                    <SiderAdmin />
                </Sider>
                <Layout
                    style={{
                        marginLeft: 200,
                    }}>
                    <HeaderAdmin />
                    <Content
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "start",
                        }}>
                        <div className="bg-white w-full m-5 rounded-md">
                            <Outlet />
                        </div>
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
            <div className="w-full h-[542px] text-4xl flex flex-1 flex-col gap-5 justify-center items-center">
                <span className="font-semibold">
                    Bạn không có quyền truy cập trang này
                </span>
                <Link
                    to={"/admin/auth/login"}
                    className="text-lg text-sky-600 hover:text-sky-400">
                    Đến trang đăng nhập
                </Link>
            </div>
        );
    }
}

export default AdminProtectedLayout;
