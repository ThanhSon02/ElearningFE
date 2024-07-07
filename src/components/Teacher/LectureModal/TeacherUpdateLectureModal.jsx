function TeacherUpdateLectureModal() {
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
            </Form>
        </ConfigProvider>
    );
}

export default TeacherUpdateLectureModal;
