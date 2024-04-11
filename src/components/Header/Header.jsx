import {
    Avatar,
    Badge,
    Button,
    ConfigProvider,
    Dropdown,
    Flex,
    Input,
} from "antd";
import { Header } from "antd/es/layout/layout";
import {
    AppstoreOutlined,
    DownOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cart from "./../Cart/Cart";

const items = [
    {
        key: "1",
        label: (
            <Link className="flex items-center gap-2 w-[140px]" to={"/profile"}>
                <UserOutlined />
                <span>Thông tin cá nhân</span>
            </Link>
        ),
    },
    {
        key: "2",
        label: (
            <Link className="flex items-center gap-2 w-[140px]" to={"/prfile"}>
                <LogoutOutlined className="text-red-600" />
                <span className="text-red-600">Đăng xuất</span>
            </Link>
        ),
    },
];

const nav = [
    {
        key: "1",
        label: <Cart />,
    },
];

function HeaderCustom() {
    const [isLogin, setIsLogin] = useState(false);
    return (
        <Header style={{ backgroundColor: "#212121" }}>
            <Flex
                align="center"
                justify="space-between"
                style={{ height: "100%" }}
                gap={24}>
                <div className="w-2/3 flex items-center gap-4">
                    <Link to={"/"} className="text-white font-bold">
                        <img src="data:image/png;base64,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"></img>
                    </Link>
                    <div>
                        <Dropdown menu={{ items: items }} placement="bottom">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <AppstoreOutlined
                                    style={{ color: "#fff", fontSize: 24 }}
                                />
                                <div>
                                    <span className="text-white font-semibold mr-[2px]">
                                        Danh mục
                                    </span>
                                    <DownOutlined
                                        style={{
                                            color: "#fff",
                                            fontSize: 12,
                                            fontWeight: 500,
                                        }}
                                    />
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    colorBgContainer: "#383838",
                                    hoverBorderColor: "#383838",
                                    colorBorder: "#383838",
                                    colorTextPlaceholder: "#eee",
                                    activeBorderColor: "#eee",
                                },
                            },
                        }}>
                        <Input
                            style={{
                                color: "#eee",
                                width: 400,
                            }}
                            placeholder="Tìm kiếm khoá học"
                            size="large"
                        />
                    </ConfigProvider>
                </div>
                <div className="flex items-center place-content-start gap-8 relative">
                    <Link
                        to={"my_course"}
                        className="text-base text-white font-semibold">
                        Khoá học của tôi
                    </Link>
                    <Dropdown
                        menu={{ items: nav }}
                        placement="bottom"
                        className="cursor-pointer mr-3 cart-header flex items-center">
                        <Link to={"/cart"}>
                            <Badge count={4} size="small">
                                <ShoppingCartOutlined
                                    style={{ color: "#fff", fontSize: 24 }}
                                />
                            </Badge>
                        </Link>
                    </Dropdown>
                    {isLogin ? (
                        <Dropdown menu={{ items: items }} placement="bottom">
                            <Avatar
                                style={{
                                    backgroundColor: "#fde3cf",
                                    color: "red",
                                }}>
                                TS
                            </Avatar>
                        </Dropdown>
                    ) : (
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        colorBgContainer: "#383838",
                                        colorBorder: "#FCCF00",
                                        defaultHoverBorderColor: "#FCCF00",
                                        fontWeight: 500,
                                    },
                                },
                            }}>
                            <Link to={"/login"}>
                                <Button style={{ color: "#fff" }}>
                                    Đăng nhập
                                </Button>
                            </Link>
                            <Link to={"/register"}>
                                <Button style={{ color: "#fff" }}>
                                    Đăng ký
                                </Button>
                            </Link>
                        </ConfigProvider>
                    )}
                </div>
            </Flex>
        </Header>
    );
}

export default HeaderCustom;
