import { ConfigProvider, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
    DashboardOutlined,
    ReadOutlined,
    UserOutlined,
} from "@ant-design/icons";

const items = [
    {
        key: "dashboard",
        label: <Link to={"/admin/dashboard"}>Trang chủ</Link>,
    },
    {
        key: "user",
        label: <Link to={"/admin/user"}>Quản lý người dùng</Link>,
    },
    {
        key: "",
        label: <p className="">Khoá học</p>,
        children: [
            {
                key: "course",
                label: <Link to={"/admin/course"}>Tất cả khoá học</Link>,
            },
            {
                key: "category",
                label: <Link to={"/admin/category"}>Tạo danh mục</Link>,
            },
        ],
    },
];

function SiderAdmin() {
    const url = useLocation();
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {},
                },
            }}>
            <Menu
                mode="inline"
                className="h-full"
                theme="dark"
                selectedKeys={url.pathname.split("/")[2]}
                defaultOpenKeys={["sub1"]}
                items={items}
            />
        </ConfigProvider>
    );
}

export default SiderAdmin;
