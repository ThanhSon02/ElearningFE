/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import { addCourse } from "../../../redux/Slice/adminSlice";
import {
    Button,
    Col,
    ConfigProvider,
    Form,
    Image,
    Input,
    InputNumber,
    Row,
    Select,
    Spin,
    Switch,
    Upload,
} from "antd";
import ReactQuill from "react-quill";
import {
    UploadOutlined,
    CloseOutlined,
    CheckOutlined,
    SaveOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function AdminCreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(
        (state) => state.admin?.data?.loginData?.token
    );
    const categories = useSelector((state) =>
        state.admin?.data?.categoryData ? state.admin?.data?.categoryData : []
    );

    const allUser = useSelector((state) =>
        state?.admin?.data?.allUserData?.allUser
            ? state?.admin?.data?.allUserData?.allUser
            : []
    );

    const categoryOption = categories.map((category) => {
        const container = {};
        container.value = category?.id;
        container.label = category?.categoryName;
        return container;
    });

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
    const [previewImage, setPreviewImage] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);

    useEffect(() => {
        setSpinning(loading);
    }, [loading]);

    const [formCreate] = Form.useForm();

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
            dispatch(addCourse({ courseData, navigate, accessToken }));
            setSpinning(false);
            navigate("/admin/course");
        } catch (error) {
            console.log(error);
            return;
        }
        formCreate.resetFields();
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    return (
        <ConfigProvider>
            <div className="px-5 py-3 shadow-lg min-h-[500px]">
                <div className="flex justify-center items-center mb-6">
                    <h2 className="font-semibold text-lg">Thêm mới khoá học</h2>
                </div>
                <Form
                    form={formCreate}
                    onFinish={onSubmitForm}
                    labelAlign={"left"}
                    layout="vertical">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 6 }}
                                label="Tên khoá học"
                                name="courseName"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Tên khoá học không được để trống",
                                    },
                                ]}>
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
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
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item
                                label="Giáo viên"
                                name="teacherId"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Giáo viên không được để trống",
                                    },
                                ]}>
                                <Select
                                    virtual={false}
                                    allowClear
                                    options={teacherOption}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Ẩn/Hiện" name="publish">
                                <Switch
                                    className="shadow-lg"
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Giá"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Giá khoá học không được để trống",
                                    },
                                ]}>
                                <InputNumber
                                    width={500}
                                    min={0}
                                    max={100000000}
                                    defaultValue={0}
                                    formatter={(value) => `${value}đ`}
                                    parser={(value) => value.replace("đ", "")}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Giá khuyến mại" name="salePrice">
                                <InputNumber
                                    min={0}
                                    max={100000000}
                                    defaultValue={0}
                                    formatter={(value) => `${value}đ`}
                                    parser={(value) => value.replace("đ", "")}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 6 }}
                                label="Mô tả"
                                name="description">
                                <ReactQuill></ReactQuill>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 6 }}
                                label="Ảnh"
                                name="imageFile"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Ảnh khoá học không được để trống",
                                    },
                                ]}>
                                <Upload
                                    listType="picture-card"
                                    accept=".png,.jpge,.jpg,.webp"
                                    onPreview={handlePreview}
                                    maxCount={1}
                                    beforeUpload={() => false}>
                                    <UploadOutlined className="text-lg " />
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
                                                    !visible &&
                                                    setPreviewImage(""),
                                            }}
                                            src={previewImage}
                                        />
                                    )}
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="w-full flex justify-end items-center gap-3">
                        <Link
                            to={"/admin/course"}
                            className="border px-3 py-1 rounded-md border-black text-black hover:border-sky-400">
                            <Button icon={<ArrowLeftOutlined />}>
                                Quay lại
                            </Button>
                        </Link>
                        <Button
                            className="bg-green-700 text-white"
                            htmlType="submit"
                            icon={<SaveOutlined />}>
                            Thêm
                        </Button>
                    </div>
                </Form>

                <Spin spinning={spinning} fullscreen />
            </div>
        </ConfigProvider>
    );
}

export default AdminCreateCourse;
