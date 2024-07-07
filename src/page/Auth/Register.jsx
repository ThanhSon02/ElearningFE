/* eslint-disable no-useless-escape */
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/Slice/authSlice";
import { Button, Flex, Form, Input } from "antd";

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = (registerRequest) => {
        dispatch(registerUser({ registerRequest, navigate }));
    };

    const [registerForm] = Form.useForm();

    return (
        <Flex justify="center" align="center" className="w-full h-full">
            <div className="bg-white rounded-lg w-[500px] mt-5 flex flex-col justify-center items-center shadow-lg ">
                <h2 className="text-xl font-semibold my-6">
                    Đăng ký tài khoản <span>StudyWorld</span>
                </h2>
                <Form
                    form={registerForm}
                    layout="vertical"
                    name="register"
                    style={{ width: "80%" }}
                    onFinish={handleRegister}>
                    <Form.Item
                        name="name"
                        label="Họ tên"
                        rules={[
                            {
                                required: true,
                                message: "Họ không được để trống!",
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: "email",
                                message: "Vui lòng nhập đúng định dạng Email!",
                            },
                            {
                                required: true,
                                message: "Email không được để trống!",
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                            {
                                required: true,
                                message: "Mật khẩu không được để trống!",
                            },
                        ]}
                        hasFeedback>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="Nhập lại mật khẩu"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập lại mật khẩu!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "Không trùng khớp với mật khẩu!"
                                        )
                                    );
                                },
                            }),
                        ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                            {
                                required: true,
                                message: "Số điện thoại không được để trống!",
                            },
                        ]}>
                        <Input
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            htmlType="submit"
                            // onClick={registerForm.submit}
                            className="w-full mb-3 uppercase font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="primary">
                            Đăng ký
                        </Button>
                        hoặc{" "}
                        <Link
                            to={"/login"}
                            className="ml-1 text-stone-400 font-medium">
                            Đăng nhập
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </Flex>
    );
}

export default Register;
