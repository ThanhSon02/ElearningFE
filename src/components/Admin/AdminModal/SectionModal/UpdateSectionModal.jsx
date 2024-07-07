/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Form, Input } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "../../../../redux/Slice/adminSlice";
import { useNavigate } from "react-router-dom";
function UpdateSectionModal({ sectionData, close }) {
    const [formUpdate] = Form.useForm();
    const accessToken = useSelector(
        (state) => state.admin?.data?.loginData?.token
    );
    console.log(sectionData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmitForm = (formData) => {
        dispatch(
            updateSection({
                sectionData: {
                    ...formData,
                    courseId: sectionData?.courseId,
                    sectionId: sectionData?.sectionId,
                },
                navigate,
                accessToken,
            })
        );

        formUpdate.resetFields();
        close();
    };

    const field = [
        {
            name: ["sectionName"],
            value: sectionData?.sectionName,
        },
        {
            name: ["courseId"],
            value: sectionData?.courseId,
        },
    ];

    return (
        <ConfigProvider>
            <Form
                form={formUpdate}
                onFinish={onSubmitForm}
                labelAlign={"left"}
                layout="vertical"
                fields={field}>
                <Form.Item
                    labelCol={{ span: 6 }}
                    label="Tên học phần"
                    name="sectionName"
                    rules={[
                        {
                            required: true,
                            message: "Tên học phần không được để trống",
                        },
                    ]}>
                    <Input allowClear />
                </Form.Item>
                <div className="flex justify-end">
                    <Button
                        htmlType="submit"
                        className="bg-green-600 text-white"
                        icon={<SaveOutlined />}>
                        Lưu
                    </Button>
                </div>
            </Form>
        </ConfigProvider>
    );
}

export default UpdateSectionModal;
