/* eslint-disable no-useless-escape */
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/Slice/authSlice";
import { Button, ConfigProvider, Flex, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (loginRequest) => {
        dispatch(loginUser({ loginRequest, navigate, type: "1" }));
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorBgContainer: "#FCCF00",
                        defaultHoverBorderColor: "#FCCF00",
                        textHoverBg: "#000",
                        fontWeight: 500,
                        defaultHoverColor: "#000",
                    },
                    Input: {
                        activeBorderColor: "#FCCF00",
                        hoverBorderColor: "#FCCF00",
                    },
                },
            }}>
            <Flex
                justify="center"
                align="center"
                style={{ paddingTop: 20, paddingBottom: 20, width: 400 }}>
                <Form
                    name="normal_login"
                    className="login-form"
                    layout="vertical"
                    style={{ width: "100%" }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleLogin}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "The input is not valid Email",
                            },
                        ]}>
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}>
                        <Input.Password
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            htmlType="submit"
                            style={{
                                width: "100%",
                                backgroundColor: "#FCCF00",
                            }}>
                            Đăng nhập
                        </Button>
                        hoặc{" "}
                        <Link
                            to={"/register"}
                            className="ml-1 text-amber-700 font-medium">
                            Đăng ký ngay!
                        </Link>
                    </Form.Item>
                </Form>
            </Flex>
        </ConfigProvider>
    );
}

export default Login;
