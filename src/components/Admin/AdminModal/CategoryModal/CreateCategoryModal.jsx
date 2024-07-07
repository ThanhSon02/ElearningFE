/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../../../redux/Slice/adminSlice";

function CreateCategoryModal({ close }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accessToken = useSelector(
        (state) => state.admin?.data?.loginData?.token
    );

    const onSubmitForm = (formData) => {
        const categoryInfo = { ...formData };
        dispatch(addCategory({ categoryInfo, navigate, accessToken }));
        close();
    };

    return (
        <ConfigProvider>
            <Form onFinish={onSubmitForm} labelAlign={"left"} layout="vertical">
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
                        icon={<PlusOutlined />}>
                        Thêm
                    </Button>
                </div>
            </Form>
        </ConfigProvider>
    );
}

export default CreateCategoryModal;
