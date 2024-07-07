import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

function TeacherCreateLectureModal() {
    const handleSubmit = (formValue) => {
        console.log(formValue);
    };

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
                name="sectionName"
                rules={[
                    {
                        required: true,
                        message: "Học phần không được để trống",
                    },
                ]}>
                <Select virtual={false} allowClear options={null} />
            </Form.Item>
            <Form.Item label="Video bài giảng" name="video">
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

export default TeacherCreateLectureModal;
