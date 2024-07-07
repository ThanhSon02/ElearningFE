import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addLecture } from "../../../../redux/Slice/adminSlice";

function CreateLectureModal({ close }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(
        (state) => state.admin?.data?.loginData?.token
    );
    const getVideoDuration = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const media = new Audio(reader.result);
                media.onloadedmetadata = () => resolve(media.duration);
            };
            reader.readAsDataURL(file);
            reader.onerror = (error) => reject(error);
        });

    const handleSubmit = async (formValue) => {
        if (formValue?.video?.fileList[0]?.originFileObj != null) {
            const duration = await getVideoDuration(
                formValue?.video?.fileList[0]?.originFileObj
            );
            const lectureData = new FormData();
            lectureData.append(
                "video",
                formValue?.video?.fileList[0]?.originFileObj
            );
            lectureData.append("lectureName", formValue?.lectureName);
            lectureData.append("videoDuration", Math.floor(duration));
            lectureData.append("sectionId", formValue?.sectionId);
            dispatch(
                addLecture({
                    lectureData,
                    navigate,
                    accessToken,
                })
            );
            createForm.resetFields();
            close();
        } else {
            const formData = new FormData();
            formData.append("lectureName", formValue?.lectureName);
            formData.append("videoDuration", 0);
            formData.append("sectionId", formValue?.sectionId);
        }
    };

    const allSection = useSelector((state) =>
        state?.admin?.data?.sectionData != null
            ? state?.admin?.data?.sectionData
            : []
    );

    const sectionOption = allSection.map((course) => {
        const container = {};
        container.value = course?.sectionId;
        container.label = course?.sectionName;
        return container;
    });

    const [createForm] = Form.useForm();
    return (
        <Form
            className="flex flex-col gap-3"
            form={createForm}
            onFinish={handleSubmit}
            labelAlign={"left"}
            layout="vertical">
            <Form.Item
                label="Tên bài giảng"
                name="lectureName"
                rules={[
                    {
                        required: true,
                        message: "Tên bài giảng không được để trống",
                    },
                ]}>
                <Input allowClear />
            </Form.Item>
            <Form.Item
                label="Học phần"
                name="sectionId"
                rules={[
                    {
                        required: true,
                        message: "Học phần không được để trống",
                    },
                ]}>
                <Select virtual={false} allowClear options={sectionOption} />
            </Form.Item>
            <Form.Item
                label="Video bài giảng"
                name="video"
                rules={[
                    {
                        required: true,
                        message: "Video bài giảng không được để trống",
                    },
                ]}>
                <Upload maxCount={1} accept=".mp4" beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>
            <div className="flex justify-end">
                <Button onClick={createForm.submit} icon={<PlusOutlined />}>
                    Thêm
                </Button>
            </div>
        </Form>
    );
}

export default CreateLectureModal;
