/* eslint-disable no-useless-escape */
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/Slice/authSlice";
import { Button, ConfigProvider, Flex, Form, Input } from "antd";

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = (registerRequest) => {
        dispatch(registerUser({ registerRequest, navigate }));
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
                    layout="vertical"
                    name="register"
                    style={{ width: "100%" }}
                    onFinish={handleRegister}>
                    <Flex justify="space-between">
                        <Form.Item
                            name="last_name"
                            label="Họ"
                            rules={[
                                {
                                    required: true,
                                    message: "Họ không được để trống!!",
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="first_name"
                            label="Tên"
                            rules={[
                                {
                                    required: true,
                                    message: "Tên không được để trống!!",
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                    </Flex>
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
                                message: "Email không được để trống!!",
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
                        label="Phone Number"
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
                            style={{
                                width: "100%",
                                backgroundColor: "#FCCF00",
                            }}
                            type="primary"
                            htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </ConfigProvider>
    );
}

export default Register;
