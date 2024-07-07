/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCategory } from "../../../../redux/Slice/adminSlice";
import { SaveOutlined } from "@ant-design/icons";

function UpdateCategoryModal({ close, data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(
        (state) => state.admin?.data?.loginData?.token
    );

    const onSubmitForm = (formData) => {
        const categoryData = { ...formData, id: data?.id };
        dispatch(updateCategory({ categoryData, navigate, accessToken }));
        close();
    };

    const field = [
        {
            name: ["categoryName"],
            value: data?.categoryName,
        },
    ];

    return (
        <ConfigProvider>
            <Form
                onFinish={onSubmitForm}
                labelAlign={"left"}
                layout="vertical"
                fields={field}>
                <Form.Item
                    labelCol={{ span: 6 }}
                    label="Tên danh mục"
                    name="categoryName"
                    rules={[
                        {
                            required: true,
                            message: "Tên danh mục không được để trống",
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

export default UpdateCategoryModal;
