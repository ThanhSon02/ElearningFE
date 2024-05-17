/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import {
    Form,
    Input,
    DatePicker,
    Row,
    Col,
    Button,
    Modal,
    ConfigProvider,
} from "antd";
import { useRef, useState } from "react";
import ProfileModal from "../../page/Profile/ProfileModal/ProfileModal";
function ProfileContent({ userInfo }) {
    const data = {
        name: `${userInfo?.firstName}  ${userInfo?.lastName}`,
        email: userInfo?.email,
        phone: userInfo?.phone,
        dateOfBirth: userInfo?.dateOfBirth,
    };

    const [changePasswordModal, setChangePasswordModal] = useState(false);
    const [confirmChange, setConfirmChange] = useState(false);
    const [disabledSave, setDisabledSave] = useState(true);
    const showChangePasswordModal = () => {
        setChangePasswordModal(true);
    };

    const hideChangePasswordModal = () => {
        setChangePasswordModal(false);
    };

    const showConfirmChange = () => {
        setConfirmChange(true);
    };

    const hideConfirmChange = () => {
        setConfirmChange(false);
    };

    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const formRef = useRef();
    const handleFormChange = () => {
        const fields = form1.getFieldsValue([
            "name",
            "email",
            "phone",
            "dateOfBirth",
        ]);
        console.log(JSON.stringify(data) === JSON.stringify(fields));
        JSON.stringify(data) === JSON.stringify(fields)
            ? setDisabledSave(true)
            : setDisabledSave(false);
    };

    const handleChangeInfo = (changeInfo) => {
        console.log(changeInfo);
    };
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {},
                    Input: {
                        activeBorderColor: "#FCCF00",
                        hoverBorderColor: "#FCCF00",
                    },
                    DatePicker: {
                        activeBorderColor: "#FCCF00",
                        hoverBorderColor: "#FCCF00",
                    },
                },
            }}>
            <Form
                initialValues={data}
                onFieldsChange={handleFormChange}
                form={form1}
                layout="vertical"
                className="w-full flex flex-col items-center bg-white rounded py-5">
                <Row gutter={120} className="w-full" justify={"center"}>
                    <Col span={12}>
                        <Form.Item label="Họ tên" name="name">
                            <Input size="large" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Email" name="email">
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={120} className="w-full" justify={"center"}>
                    <Col span={12}>
                        <Form.Item label="Số điện thoại" name="phone">
                            <Input size="large" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Ngày sinh" name="dateOfBirth">
                            <DatePicker className="w-full" size="large" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={120} justify={"center"} className="w-full">
                    <Col span={12}>
                        <Form.Item label>
                            <Button
                                size="large"
                                onClick={showChangePasswordModal}
                                className="w-full bg-sky-500 text-white hover:opacity-90">
                                Thay đổi mật khẩu
                            </Button>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label>
                            <Button
                                disabled={disabledSave}
                                size="large"
                                className="w-full bg-sky-500 text-white hover:opacity-90"
                                onClick={showConfirmChange}>
                                Cập nhật thông tin
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Modal
                title="Bạn có muốn thay đổi thông tin?"
                open={confirmChange}
                onOk={hideConfirmChange}
                onCancel={hideConfirmChange}>
                <Form>
                    <Form.Item label="Nhập mật khẩu của bạn">
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Thay đổi mật khẩu"
                open={changePasswordModal}
                onCancel={hideChangePasswordModal}
                footer={[
                    <Button key="cancel" onClick={hideChangePasswordModal}>
                        Huỷ
                    </Button>,
                    <Button key="submit" onClick={form.submit}>
                        Thay đổi
                    </Button>,
                ]}>
                <ProfileModal form={form} formRef={formRef} />
            </Modal>
        </ConfigProvider>
    );
}

export default ProfileContent;
