import { ConfigProvider, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
    TeamOutlined,
    FormOutlined,
    PercentageOutlined,
    TruckOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
const items = [
    {
        key: "",
        label: (
            <div className="font-medium uppercase text-lg cursor-default">
                Trang quản lý
            </div>
        ),
    },
    {
        key: "dashboard",
        label: (
            <Link to={"/admin/dashboard"}>
                <HomeOutlined /> Trang chủ
            </Link>
        ),
    },
    {
        key: "user",
        label: (
            <Link to={"/admin/user"}>
                <TeamOutlined /> Quản lý người dùng
            </Link>
        ),
    },
    {
        key: "",
        label: (
            <p className="">
                <FormOutlined /> Quản lý
            </p>
        ),
        children: [
            {
                key: "course",
                label: <Link to={"/admin/course"}>Khoá học</Link>,
            },
            {
                key: "section",
                label: <Link to={"/admin/section"}>Học phần</Link>,
            },
            {
                key: "lecture",
                label: <Link to={"/admin/lecture"}>Bài giảng</Link>,
            },
            {
                key: "category",
                label: <Link to={"/admin/category"}>Danh mục</Link>,
            },
        ],
    },

    {
        key: "order",
        label: (
            <Link to={"/admin/order"}>
                <TruckOutlined /> Đơn hàng
            </Link>
        ),
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
