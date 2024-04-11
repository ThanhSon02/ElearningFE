import { Form, Input, DatePicker, Row, Col, Button } from "antd";
function ProfileContent() {
    return (
        <Form
            layout="vertical"
            className="w-full flex flex-col items-center bg-white rounded py-5">
            <Row gutter={120} className="w-full" justify={"center"}>
                <Col span={12}>
                    <Form.Item label="Họ tên">
                        <Input size="large" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label="Email">
                        <Input size="large" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={120} className="w-full" justify={"center"}>
                <Col span={12}>
                    <Form.Item label="Số điện thoại">
                        <Input size="large" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label="Ngày sinh">
                        <DatePicker className="w-full" size="large" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={120} justify={"center"} className="w-full">
                <Col span={12}>
                    <Form.Item label=" ">
                        <Button size="large" className="w-full">
                            Thay đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label=" ">
                        <Button size="large" className="w-full">
                            Cập nhật thông tin
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

export default ProfileContent;
