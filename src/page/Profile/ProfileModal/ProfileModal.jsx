/* eslint-disable react/prop-types */
import { ConfigProvider, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../redux/Slice/authSlice";

function ProfileModal({ form, formRef }) {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth?.data?.token);
    const email = useSelector((state) => state.auth?.data?.user?.email);
    const handleChangePassword = (dataChange) => {
        dataChange = { email: email, ...dataChange };
        dispatch(changePassword({ dataChange, accessToken }));
        form.resetFields();
    };

    return (
        <ConfigProvider>
            <Form
                form={form}
                ref={formRef}
                onFinish={handleChangePassword}
                labelAlign={"left"}
                layout="vertical">
                <Form.Item
                    labelCol={{ span: 6 }}
                    label="Mật khẩu cũ"
                    name="oldPassword"
                    rules={[
                        {
                            required: true,
                            message: "Mật khẩu không được để trống!",
                        },
                    ]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    label="Mật khẩu mới"
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
                    label="Nhập lại mật khẩu mới"
                    dependencies={["newPassword"]}
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
                                    getFieldValue("newPassword") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Không trùng khớp với mật khẩu!")
                                );
                            },
                        }),
                    ]}>
                    <Input.Password />
                </Form.Item>
            </Form>
        </ConfigProvider>
    );
}

export default ProfileModal;
