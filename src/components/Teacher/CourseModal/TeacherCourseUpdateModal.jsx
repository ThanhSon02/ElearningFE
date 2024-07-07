/* eslint-disable react/prop-types */
import {
    Button,
    Card,
    ConfigProvider,
    Divider,
    Form,
    Image,
    Input,
    InputNumber,
    Select,
    Space,
    Spin,
    Upload,
} from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../../../config/axiosInstance";
import { updateCourse } from "../../../../redux/Slice/adminSlice";
import { useNavigate } from "react-router-dom";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function TeacherCourseUpdateModal({ formRef, form, close, data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(
        (state) => state.admin?.data?.loginData?.token
    );
    const categories = useSelector((state) =>
        state.admin?.data?.categoryData ? state.admin?.data?.categoryData : []
    );

    const categoryOption = categories.map((category) => {
        const container = {};
        container.value = category?.id;
        container.label = category?.categoryName;
        return container;
    });

    const loading = useSelector((state) => state.admin.loading);
    const [spinning, setSpinning] = useState(loading);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [formAllValue, setFormAllValue] = useState(null);
    const [fileList, setFileList] = useState([
        {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: data?.imageLink,
        },
    ]);
    const handleChange = ({ fileList: newFileList }) => {
        setFormAllValue(form.getFieldsValue(true));
        setFileList(newFileList);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    useEffect(() => {
        setSpinning(loading);
    }, [loading]);

    const onSubmitForm = async (formInfo) => {
        if (fileList[0]?.originFileObj) {
            const formData = new FormData();
            formData.append("image", fileList[0]?.originFileObj);
            try {
                setSpinning(true);
                const res = await axiosInstance.post(
                    "/api/cloudinary/upload",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                setSpinning(false);
                const courseData = {
                    ...formAllValue,
                    id: data?.id,
                    imageLink: res.data?.data?.imageLink,
                };
                dispatch(updateCourse({ courseData, navigate, accessToken }));
            } catch (error) {
                console.log(error);
                return;
            }
        } else {
            const courseData = {
                ...formInfo,
                id: data?.id,
                imageLink: data?.imageLink,
            };
            dispatch(updateCourse({ courseData, navigate, accessToken }));
        }
        form.resetFields();
        close();
    };

    const field = [
        {
            name: ["courseName"],
            value: data?.courseName,
        },
        {
            name: ["categoryId"],
            value: data?.category?.id,
        },
        {
            name: ["price"],
            value: data?.price,
        },
        {
            name: ["salePrice"],
            value: data?.salePrice,
        },
        {
            name: ["imageLink"],
            value: data?.imageLink,
        },
        {
            name: ["description"],
            value: data?.description,
        },
        {
            name: ["chapters"],
            value: data?.chapters,
        },
    ];

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none",
            }}
            type="button">
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}>
                Upload
            </div>
        </button>
    );

    return (
        <ConfigProvider>
            <Spin spinning={spinning} fullscreen />
            <Form
                form={form}
                ref={formRef}
                onFinish={onSubmitForm}
                labelAlign={"left"}
                layout="vertical"
                fields={field}>
                <Form.Item
                    labelCol={{ span: 6 }}
                    label="Tên khoá học"
                    name="courseName"
                    rules={[
                        {
                            required: true,
                            message: "Tên khoá học không được để trống",
                        },
                    ]}>
                    <Input allowClear />
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 6 }}
                    label="Chọn danh mục"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                            message: "Danh mục không được để trống",
                        },
                    ]}>
                    <Select
                        virtual={false}
                        allowClear
                        options={categoryOption}
                    />
                </Form.Item>
                <Space size={"large"}>
                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Giá khoá học không được để trống",
                            },
                        ]}>
                        <InputNumber
                            min={0}
                            max={100000000}
                            formatter={(value) => `${value}đ`}
                            parser={(value) => value.replace("đ", "")}
                        />
                    </Form.Item>
                    <Form.Item label="Giá khuyến mại" name="salePrice">
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
                <Form.Item labelCol={{ span: 6 }} label="Ảnh" name="imageFile">
                    <Upload
                        listType="picture-card"
                        maxCount={1}
                        onPreview={handlePreview}
                        fileList={fileList}
                        beforeUpload={() => false}
                        onChange={handleChange}>
                        {fileList.length >= 2 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{
                                display: "none",
                            }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) =>
                                    setPreviewOpen(visible),
                                afterOpenChange: (visible) =>
                                    !visible && setPreviewImage(""),
                            }}
                            src={previewImage}
                        />
                    )}
                </Form.Item>
                <Divider />
                <Form.List name="chapters">
                    {(fields, { add, remove }) => (
                        <div
                            style={{
                                display: "flex",
                                rowGap: 16,
                                flexDirection: "column",
                            }}>
                            {fields.map((field) => (
                                <Card
                                    size="small"
                                    title={`Chương ${field.name + 1}`}
                                    key={field.key}
                                    extra={
                                        <CloseOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    }>
                                    <Form.Item
                                        label="Tên chương"
                                        name={[field.name, "chapterName"]}>
                                        <Input />
                                    </Form.Item>

                                    {/* Nest Form.List */}
                                    <Form.Item label="Bài học">
                                        <Form.List
                                            name={[field.name, "lessons"]}>
                                            {(subFields, subOpt) => (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        rowGap: 16,
                                                    }}>
                                                    {subFields.map(
                                                        (subField) => (
                                                            <Space
                                                                key={
                                                                    subField.key
                                                                }>
                                                                <Form.Item
                                                                    noStyle
                                                                    name={[
                                                                        subField.name,
                                                                        "lessonName",
                                                                    ]}>
                                                                    <Input placeholder="Tên bài giảng" />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    noStyle
                                                                    name={[
                                                                        subField.name,
                                                                        "lessonVideo",
                                                                    ]}>
                                                                    <Input placeholder="Đường dẫn video bài giảng" />
                                                                </Form.Item>
                                                                <CloseOutlined
                                                                    onClick={() => {
                                                                        subOpt.remove(
                                                                            subField.name
                                                                        );
                                                                    }}
                                                                />
                                                            </Space>
                                                        )
                                                    )}
                                                    <Button
                                                        type="dashed"
                                                        onClick={() =>
                                                            subOpt.add()
                                                        }
                                                        block>
                                                        + Thêm bài giảng
                                                    </Button>
                                                </div>
                                            )}
                                        </Form.List>
                                    </Form.Item>
                                </Card>
                            ))}

                            <Button
                                className="bg-sky-500 text-white"
                                onClick={() => add()}
                                block>
                                + Thêm chương
                            </Button>
                        </div>
                    )}
                </Form.List>
            </Form>
        </ConfigProvider>
    );
}

export default TeacherCourseUpdateModal;
