import { ConfigProvider, Form, Input } from "antd";

function ProfileModal({ form, formRef }) {
    const handleChangePassword = (dataChange) => {
        console.log(dataChange);
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
