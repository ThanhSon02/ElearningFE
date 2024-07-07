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
    Spin,
} from "antd";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { changePassword, updateUserInfo } from "../../redux/Slice/authSlice";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
function ProfileContent() {
    const loading = useSelector((state) => state.auth?.loading);
    const userInfo = useSelector((state) => state.auth?.data?.user);
    const accessToken = useSelector((state) => state.auth?.data?.token);

    const data = {
        name: userInfo?.name,
        email: userInfo?.email,
        phone: userInfo?.phone,
        dateOfBirth: dayjs(userInfo?.dateOfBirth),
    };

    const [changePasswordModal, setChangePasswordModal] = useState(false);
    const [otpModal, setOtpModal] = useState(false);
    const [confirmChange, setConfirmChange] = useState(false);
    const [disabledSave, setDisabledSave] = useState(true);
    const [formChangePassValue, setFormChangePassValue] = useState();
    const [spinning, setSpinning] = useState(loading);
    const showChangePasswordModal = () => {
        setChangePasswordModal(true);
    };

    const hideChangePasswordModal = () => {
        setChangePasswordModal(false);
    };

    const showOtpModal = () => {
        setOtpModal(true);
    };

    const hideOtpModal = () => {
        setOtpModal(false);
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
    const [formOTP] = Form.useForm();
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

    const handleChangePassword = (otp) => {
        const dataChange = {
            ...formChangePassValue,
            otp: otp?.otp,
            userId: userInfo?.id,
        };
        dispatch(changePassword({ dataChange, accessToken }));
        formOTP.resetFields();
        hideOtpModal();
    };

    const handleChangePasswordSubmit = async (dataChange) => {
        setSpinning(true);
        hideChangePasswordModal();
        try {
            const res = await axiosInstance.post(
                "/api/user/check_password",
                {
                    password: dataChange?.oldPassword,
                    type: "01",
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            if (res.data?.data?.checkPass) {
                setFormChangePassValue({
                    email: userInfo?.email,
                    ...dataChange,
                });
                setSpinning(false);
                showOtpModal();
                formChangePass.resetFields();
            } else {
                toast.error(res.data?.message);
                setSpinning(false);
            }
        } catch (error) {
            toast.error(error.response.data?.message);
            setSpinning(false);
        }
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleCheckPass = async (pass) => {
        setSpinning(true);
        try {
            const res = await axiosInstance.post(
                "/api/user/check_password",
                { ...pass, type: "" },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            if (res.data?.data?.checkPass) {
                formChangeInfo.submit();
                formCheckPass.resetFields();
                hideConfirmChange();
                setSpinning(false);
            } else {
                toast.error(res.data?.message);
                setSpinning(false);
            }
        } catch (error) {
            toast.error(error.response.data?.message);
            setSpinning(false);
        }
    };

    dayjs.extend(customParseFormat);
    const handleChangeInfo = (dataChange) => {
        const userInfo = {
            ...dataChange,
            dateOfBirth: dayjs(dataChange.dateOfBirth)
                .format("DD/MM/YYYY")
                .toString(),
        };
        dispatch(updateUserInfo({ userInfo, navigate, accessToken }));
        if (!loading) {
            hideConfirmChange();
        }
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
            <Spin spinning={spinning} fullscreen className="z-50" />
            <Form
                initialValues={data}
                onFieldsChange={handleFormChange}
                layout="vertical"
                onFinish={handleChangeInfo}
                form={formChangeInfo}
                className="w-full flex flex-col items-center bg-white rounded py-5 min-h-[400px] justify-around">
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
                            <DatePicker
                                className="w-full"
                                size="large"
                                format={"DD/MM/YYYY"}
                            />
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
                    <Button
                        key="submit"
                        onClick={() => formChangePass.submit()}>
                        Thay đổi
                    </Button>,
                ]}>
                <Form
                    form={formChangePass}
                    ref={formChangePassRef}
                    onFinish={handleChangePasswordSubmit}
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
                                        new Error(
                                            "Không trùng khớp với mật khẩu!"
                                        )
                                    );
                                },
                            }),
                        ]}>
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Nhập OTP"
                open={otpModal}
                onCancel={hideOtpModal}
                footer={[
                    <Button key="cancel" onClick={hideOtpModal}>
                        Huỷ
                    </Button>,
                    <Button key="submit" onClick={() => formOTP.submit()}>
                        Xác nhận
                    </Button>,
                ]}>
                <Form
                    form={formOTP}
                    onFinish={handleChangePassword}
                    className="w-full">
                    <Form.Item name="otp" className="w-full">
                        <Input.OTP className="w-full" size="large" />
                    </Form.Item>
                </Form>
            </Modal>
        </ConfigProvider>
    );
}

export default ProfileContent;
