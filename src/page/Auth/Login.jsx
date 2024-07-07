/* eslint-disable no-useless-escape */
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/Slice/authSlice";
import { Button, Flex, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (loginRequest) => {
        dispatch(loginUser({ loginRequest, navigate, type: "1" }));
    };

    const [loginForm] = Form.useForm();

    return (
        <Flex justify="center" align="start" className="w-full h-full">
            <div className="bg-white rounded-lg w-[500px] flex flex-col justify-center items-center shadow-lg mt-[100px]">
                <h2 className="text-xl font-semibold my-6">
                    Đăng nhập vào <span>StudyWorld</span>
                </h2>
                <Form
                    form={loginForm}
                    name="normal_login"
                    className="login-form"
                    layout="vertical"
                    style={{ width: "80%" }}
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
                                message: "Email không được để trống",
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
                                message: "Mật khẩu không được để trống",
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
                            // onClick={loginForm.submit}
                            htmlType="submit"
                            type="primary"
                            className="w-full mb-3 uppercase font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Đăng nhập
                        </Button>
                        hoặc{" "}
                        <Link
                            to={"/register"}
                            className="ml-1 text-stone-400 font-medium">
                            Đăng ký ngay!
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </Flex>
    );
}

export default Login;
