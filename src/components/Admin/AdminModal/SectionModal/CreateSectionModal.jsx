/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { addSection } from "../../../../redux/Slice/adminSlice";
function CreateSectionModal({ close }) {
    const allCourse = useSelector((state) =>
        state.admin.data?.courseData != null ? state.admin.data?.courseData : []
    );

    const courseOption = allCourse.map((course) => {
        const container = {};
        container.value = course?.id;
        container.label = course?.courseName;
        return container;
    });

    const accessToken = useSelector(
        (state) => state.admin?.data?.loginData?.token
    );

    const [formCreate] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitForm = (formData) => {
        dispatch(addSection({ sectionData: formData, navigate, accessToken }));
        formCreate.resetFields();
        close();
    };

    return (
        <ConfigProvider>
            <Form
                form={formCreate}
                onFinish={onSubmitForm}
                labelAlign={"left"}
                layout="vertical">
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
                <Form.Item
                    labelCol={{ span: 6 }}
                    label="Khoá học"
                    name="courseId"
                    rules={[
                        {
                            required: true,
                            message:
                                "Khoá học của học phần không được để trống",
                        },
                    ]}>
                    <Select virtual={false} allowClear options={courseOption} />
                </Form.Item>
                <div className="flex justify-end">
                    <Button
                        htmlType="submit"
                        className="bg-green-600 text-white"
                        icon={<PlusOutlined />}>
                        Thêm
                    </Button>
                </div>
            </Form>
        </ConfigProvider>
    );
}

export default CreateSectionModal;
