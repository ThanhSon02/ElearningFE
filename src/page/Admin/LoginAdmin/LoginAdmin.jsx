import { Button, ConfigProvider, Flex, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loginAdminUser } from "../../../redux/Slice/adminSlice";
import { ToastContainer } from "react-toastify";
function LoginAdmin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (loginRequest) => {
        dispatch(loginAdminUser({ loginRequest, navigate, type: "2" }));
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorBgContainer: "#7234fc",
                        defaultHoverBorderColor: "#7234fc",
                        textHoverBg: "#000",
                        fontWeight: 500,
                        defaultHoverColor: "#fff",
                    },
                    Input: {
                        activeBorderColor: "#7234fc",
                        hoverBorderColor: "#7234fc",
                    },
                },
            }}>
            <div className="flex justify-center items-center h-screen">
                <Flex
                    justify="center"
                    align="center"
                    className="w-1/3 flex flex-col bg-white rounded-2xl overflow-hidden shadow-xl">
                    <div className="bg-[#7234fc] text-white text-lg font-medium flex justify-center items-center w-full py-10">
                        <h1 className="uppercase">Admin Login</h1>
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form w-full bg-white pt-4 px-10"
                        layout="vertical"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={handleLogin}>
                        <Form.Item
                            className="font-medium"
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
                            className="font-medium"
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
                                className="w-full bg-white shadow-lg py-5 flex justify-center items-center">
                                <span>Đăng nhập</span>
                            </Button>
                        </Form.Item>
                    </Form>
                </Flex>
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
            </div>
        </ConfigProvider>
    );
}

export default LoginAdmin;
