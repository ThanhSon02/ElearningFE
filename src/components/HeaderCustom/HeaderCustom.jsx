import { Avatar, Badge, Button, Dropdown, Input, Select } from "antd";
import { Header } from "antd/es/layout/layout";
import {
    ShoppingCartOutlined,
    UserOutlined,
    LogoutOutlined,
    ControlOutlined,
    BookOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/Slice/authSlice";
import { useEffect, useState } from "react";
import { getAllCourse } from "../../redux/Slice/appSlice";

function HeaderCustom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllCourse());
    }, []);

    const handleLogOut = (navigate) => {
        dispatch(logOut({ navigate }));
    };

    const allCourse = useSelector((state) => state.app?.data?.course);
    const items = [
        {
            key: "1",
            label: (
                <Link
                    className="flex items-center gap-2 m-w-[140px]"
                    to={"/profile"}>
                    <UserOutlined />
                    <span>Thông tin cá nhân</span>
                </Link>
            ),
        },
        {
            key: "2",
            label: (
                <Link
                    className="flex items-center gap-2 m-w-[140px]"
                    to={"/profile"}>
                    <ControlOutlined />
                    <span>Trang dành cho giáo viên</span>
                </Link>
            ),
        },
        {
            key: "3",
            label: (
                <div
                    onClick={() => handleLogOut(navigate)}
                    className="flex items-center gap-2 m-w-[140px]">
                    <LogoutOutlined className="text-red-600" />
                    <span className="text-red-600">Đăng xuất</span>
                </div>
            ),
        },
    ];

    const userLogin = useSelector((state) =>
        state.auth.data?.user ? state.auth.data?.user : null
    );

    const cartData = useSelector((state) =>
        state?.cart?.cartList ? state?.cart?.cartList : []
    );

    const [searchInput, setSearchInput] = useState();
    return (
        <Header className="relative z-50 w-full flex justify-between items-center bg-white shadow-md overflow-hidden">
            <div className="flex items-center gap-4 w-fit h-full overflow-hidden">
                <Link
                    to={"/"}
                    className="text-black font-bold flex justify-center items-center">
                    <img
                        srcSet="/public/Logo.jpg"
                        className="w-[160px] object-cover"
                        alt="Logo"></img>
                </Link>
            </div>
            <div className="flex flex-1  items-center gap-8 relative">
                <Select
                    className="w-full flex-1"
                    placeholder="Tìm kiếm khoá học"
                    size="large"
                    defaultActiveFirstOption={false}
                    showSearch={true}
                    virtual={false}
                    showArrow={false}
                    value={searchInput}
                    onChange={(value) => {
                        setSearchInput(value);
                        if (value !== "") {
                            navigate(`/detail/${value}`, { state: value });
                        }
                    }}
                    filterOption={(inputValue, option) =>
                        option.title.toLowerCase().includes(inputValue)
                    }>
                    {allCourse.map((course) => (
                        <Select.Option
                            key={course.id}
                            title={course.courseName}
                            value={course.id}>
                            {course.courseName}
                        </Select.Option>
                    ))}
                </Select>
                <div className="flex items-center gap-3">
                    {userLogin ? (
                        <Link
                            to={"my_course"}
                            className="text-sm font-medium p-2 text-black text-nowrap flex items-center gap-2 hover:bg-[#27272a1f] rounded-md">
                            <BookOutlined />
                            <span>Khoá học của tôi</span>
                        </Link>
                    ) : (
                        <></>
                    )}
                    <Badge
                        offset={[-6, 6]}
                        count={cartData.length ? cartData.length : 0}
                        size="default">
                        <Link
                            to={"/cart"}
                            className="flex p-2 text-black hover:bg-[#27272a1f] rounded-md">
                            <div className="flex gap-2 items-center text-sm font-medium">
                                <ShoppingCartOutlined />
                                <span>Giỏ hàng</span>
                            </div>
                        </Link>
                    </Badge>
                    {userLogin ? (
                        <Dropdown
                            menu={{ items: items }}
                            placement="bottom"
                            virtual={false}
                            className="cursor-pointer">
                            <Avatar
                                className="hover:bg-[#27272a1f] uppercase"
                                style={{
                                    backgroundColor: "#fde3cf",
                                    color: "red",
                                }}>
                                {userLogin?.name.split(" ").length > 1
                                    ? userLogin?.name.split(" ")[0][0] +
                                      userLogin?.name.split(" ")[1][0]
                                    : userLogin?.name.split(" ")[0][0]}
                            </Avatar>
                        </Dropdown>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to={"/login"}>
                                <Button type="primary" className="">
                                    Đăng nhập
                                </Button>
                            </Link>
                            <Link to={"/register"}>
                                <Button type="primary" className="">
                                    Đăng ký
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </Header>
    );
}

export default HeaderCustom;
