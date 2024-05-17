/* eslint-disable react/prop-types */
import {
    Button,
    Card,
    Checkbox,
    ConfigProvider,
    Divider,
    Form,
    Input,
    InputNumber,
    Rate,
    Select,
    Space,
    Upload,
} from "antd";
import {
    UploadOutlined,
    MinusCircleOutlined,
    PlusOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function AdminCourseModal({ formRef, form }) {
    const [imgBase64, setImgBase64] = useState("");
    const getBase64 = (img) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImgBase64(reader.result);
        });
        if (img) {
            reader.readAsDataURL(img);
        }
    };

    const handleUploadFile = (file) => {
        if (file.status !== "removed") {
            getBase64(file);
        }
    };

    const dispatch = useDispatch();
    // const accessToken = useSelector((state) => state.auth.auth.accessToken);

    const onSubmitForm = (formInfo) => {
        // const bookInfo = {
        //     ...formInfo,
        //     book_img: imgBase64,
        // };
        console.log(formInfo);
        // dispatch(createBook({ bookInfo, accessToken }));
        form.resetFields();
    };
    return (
        <ConfigProvider>
            <Form
                form={form}
                ref={formRef}
                onFinish={onSubmitForm}
                labelAlign={"left"}
                layout="vertical">
                <Form.Item
                    labelCol={{ span: 6 }}
                    label="Tên khoá học"
                    name="book_name">
                    <Input allowClear />
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 6 }}
                    label="Chọn danh mục"
                    name="category">
                    <Select options={{}} />
                </Form.Item>
                <Space size={"large"}>
                    <Form.Item label="Giá" name="price">
                        <InputNumber
                            min={0}
                            max={100000000}
                            formatter={(value) => `${value}đ`}
                            parser={(value) => value.replace("đ", "")}
                        />
                    </Form.Item>
                    <Form.Item label="Giá khuyến mại" name="sale_price">
                        <InputNumber
                            min={0}
                            max={100000000}
                            formatter={(value) => `${value}đ`}
                            parser={(value) => value.replace("đ", "")}
                        />
                    </Form.Item>
                </Space>
                <Form.Item
                    labelCol={{ span: 6 }}
                    label="Mô tả"
                    name="description">
                    <ReactQuill></ReactQuill>
                </Form.Item>
                <Form.Item labelCol={{ span: 6 }} label="Ảnh" name="book_img">
                    <Upload
                        maxCount={1}
                        beforeUpload={() => false}
                        onChange={(e) => handleUploadFile(e.file)}>
                        <Button icon={<UploadOutlined />}>
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>
                <Divider />
                <Form.List name={"lesson"}>
                    {(fields, subOpt) => (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: 16,
                            }}>
                            {fields.map((field) => (
                                <Space key={field.key}>
                                    <Form.Item
                                        label="Tên bài học"
                                        name={[field.name, "lesson_name"]}>
                                        <Input placeholder="Tên bài học" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Đường dẫn video"
                                        name={[field.name, "lesson_video"]}>
                                        <Input placeholder="Đường dẫn video" />
                                    </Form.Item>
                                    <MinusCircleOutlined
                                        onClick={() => {
                                            subOpt.remove(field.name);
                                        }}
                                    />
                                </Space>
                            ))}
                            <Button
                                type="dashed"
                                onClick={() => subOpt.add()}
                                block>
                                + Thêm bài học
                            </Button>
                        </div>
                    )}
                </Form.List>
            </Form>
        </ConfigProvider>
    );
}

export default AdminCourseModal;
