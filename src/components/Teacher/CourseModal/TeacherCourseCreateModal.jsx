/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Button,
    Card,
    ConfigProvider,
    Divider,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    Spin,
    Upload,
} from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../../../config/axiosInstance";
import { addCourse } from "../../../../redux/Slice/adminSlice";
import { useNavigate } from "react-router-dom";
function TeacherCourseCreateModal({ formRef, form, close }) {
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
    const allUser = useSelector((state) =>
        state?.admin?.data?.allUserData?.allUser
            ? state?.admin?.data?.allUserData?.allUser
            : []
    );

    const teacherOption = allUser
        .filter((user) => user?.roles[0]?.roleName == "ROLE_TEACHER")
        .map((userF) => {
            const container = {};
            container.value = userF?.id;
            container.label = userF?.name;
            return container;
        });

    const loading = useSelector((state) => state.admin.loading);
    const [spinning, setSpinning] = useState(loading);
    useEffect(() => {
        setSpinning(loading);
    }, [loading]);

    const onSubmitForm = async (formInfo) => {
        const formData = new FormData();
        formData.append(
            "image",
            formInfo?.imageFile?.fileList[0]?.originFileObj
        );
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
            const courseData = {
                ...formInfo,
                imageLink: res.data?.data?.imageLink,
            };
            console.log(courseData);
            dispatch(addCourse({ courseData, navigate, accessToken }));
            setSpinning(false);
        } catch (error) {
            console.log(error);
            return;
        }
        form.resetFields();
        close();
    };

    return (
        <ConfigProvider>
            <Spin spinning={spinning} fullscreen />
            <Form
                form={form}
                ref={formRef}
                onFinish={onSubmitForm}
                labelAlign={"left"}
                layout="vertical">
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
                        maxCount={1}
                        beforeUpload={() => false}
                        onChange={(e) => handleUploadFile(e.file)}>
                        <Button icon={<UploadOutlined />}>
                            Click to Upload
                        </Button>
                    </Upload>
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

export default TeacherCourseCreateModal;
