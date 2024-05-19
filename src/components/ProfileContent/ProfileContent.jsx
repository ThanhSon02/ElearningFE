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
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";
function ProfileContent({ userInfo }) {
    const data = {
        name: `${userInfo?.firstName}  ${userInfo?.lastName}`,
        email: userInfo?.email,
        phone: userInfo?.phone,
        dateOfBirth: userInfo?.dateOfBirth,
    };

    const loading = useSelector((state) => state.auth?.loading);

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

    const [formChangePass] = Form.useForm();
    const [formCheckPass] = Form.useForm();
    const [formChangeInfo] = Form.useForm();
    const formChangePassRef = useRef();
    const handleFormChange = () => {
        const fields = formChangeInfo.getFieldsValue([
            "name",
            "email",
            "phone",
            "dateOfBirth",
        ]);
        JSON.stringify(data) === JSON.stringify(fields)
            ? setDisabledSave(true)
            : setDisabledSave(false);
    };

    const handleChangePassword = () => {
        formChangePassRef.current.submit();
        if (!loading) {
            hideChangePasswordModal();
        }
    };
    const userId = useSelector((state) => state.auth?.data?.user?.id);
    const accessToken = useSelector((state) => state.auth?.data?.token);
    const dispatch = useDispatch();
    const handleCheckPass = async (pass) => {
        try {
            const res = await axiosInstance.post(
                "/api/user/check_password",
                { ...pass, id: userId },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            if (res.data?.data?.checkPass) {
                formChangeInfo.submit();
                formCheckPass.resetFields();
                hideConfirmChange();
            } else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            toast.error(error.response.data?.message);
        }
    };

    const handleChangeInfo = (dataChange) => {
        console.log(dataChange);
        // if (!loading) {
        //     hideConfirmChange();
        // }
        // formChangeInfo.submit;
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
                layout="vertical"
                onFinish={handleChangeInfo}
                form={formChangeInfo}
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
                onCancel={hideConfirmChange}
                footer={[
                    <Button key={"cancel"} onClick={hideConfirmChange}>
                        Huỷ
                    </Button>,
                    <Button
                        key={"update"}
                        type="primary"
                        className=" bg-sky-500 text-white hover:opacity-90"
                        onClick={formCheckPass.submit}>
                        Cập nhật
                    </Button>,
                ]}>
                <Form onFinish={handleCheckPass} form={formCheckPass}>
                    <Form.Item label="Nhập mật khẩu của bạn" name="password">
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
                    <Button key="submit" onClick={handleChangePassword}>
                        Thay đổi
                    </Button>,
                ]}>
                <ProfileModal
                    form={formChangePass}
                    formRef={formChangePassRef}
                />
            </Modal>
        </ConfigProvider>
    );
}

export default ProfileContent;
