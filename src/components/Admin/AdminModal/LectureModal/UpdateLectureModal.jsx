/* eslint-disable react/prop-types */
import { Button, Form, Input, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateLecture } from "../../../../redux/Slice/adminSlice";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

function UpdateLectureModal({ data, close }) {
    console.log(data);
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
            lectureData.append("lectureId", data?.lectureId);
            lectureData.append("lectureName", formValue?.lectureName);
            lectureData.append("videoDuration", Math.floor(duration));
            dispatch(
                updateLecture({
                    lectureData,
                    navigate,
                    accessToken,
                })
            );
            updateForm.resetFields();
            close();
        } else {
            const lectureData = new FormData();
            lectureData.append("lectureId", data?.id);
            lectureData.append("videoDuration", 0);
            lectureData.append("lectureName", formValue?.lectureName);
            lectureData.append("video", null);
            dispatch(
                updateLecture({
                    lectureData,
                    navigate,
                    accessToken,
                })
            );
            updateForm.resetFields();
            close();
        }
    };

    const [updateForm] = Form.useForm();

    const field = [
        {
            name: ["lectureName"],
            value: data?.lectureName,
        },
        {
            name: ["video"],
            value: null,
        },
    ];

    return (
        <Form
            className="flex flex-col gap-3"
            form={updateForm}
            onFinish={handleSubmit}
            labelAlign={"left"}
            fields={field}
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
            <Form.Item label="Video bài giảng" name="video">
                <Upload maxCount={1} accept=".mp4" beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>
            <div className="flex justify-end">
                <Button onClick={updateForm.submit}>Cập nhật</Button>
            </div>
        </Form>
    );
}

export default UpdateLectureModal;
