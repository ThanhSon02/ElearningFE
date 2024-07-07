import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
} from "antd";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function CreateCouponModal() {
    const courseList = useSelector((state) => state.admin?.data?.courseData);

    const courseOption = courseList.map((course) => {
        const container = {};
        container.value = course?.id;
        container.label = course?.courseName;
        return container;
    });

    const [createCouponForm] = Form.useForm();

    const handleCreateCoupon = (formData) => {
        const formValue = {
            ...formData,
            startTime: dayjs(formData?.timeRange[0])
                .format("DD/MM/YYYY")
                .toString(),
            endTime: dayjs(formData?.timeRange[1])
                .format("DD/MM/YYYY")
                .toString(),
        };
    };

    return (
        <div className="w-full">
            <Form
                form={createCouponForm}
                onFinish={handleCreateCoupon}
                labelAlign={"left"}
                layout="vertical">
                <Row align={"middle"} justify={"space-between"} gutter={12}>
                    <Col span={12}>
                        <Form.Item
                            labelCol={{ span: 12 }}
                            label="Tên mã khuyến mại"
                            name="couponName"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Tên mã khuyến mại không được để trống",
                                },
                            ]}>
                            <Input allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            labelCol={{ span: 12 }}
                            label="Mã khuyến mại"
                            name="couponCode"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Mã khuyến mại không được để trống",
                                },
                                {
                                    max: 100,
                                    message:
                                        "Mã khuyến mại không được quá 100 ký tự",
                                },
                            ]}>
                            <Input allowClear />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className="w-full">
                    <Col span={12}>
                        <Form.Item
                            labelCol={{ span: 6 }}
                            label="Số lượng"
                            name="amount"
                            rules={[
                                {
                                    required: true,
                                    message: "Số lượng không được để trống",
                                },
                            ]}>
                            <InputNumber allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Khuyến mại"
                            name={"discount"}
                            rules={[
                                {
                                    required: true,
                                    message: "Khuyến mại không được để trống",
                                },
                            ]}>
                            <InputNumber allowClear />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Từ ngày - Đến ngày" name={"timeRange"}>
                    <DatePicker.RangePicker />
                </Form.Item>
                <Row justify={"end"}>
                    <Button
                        onClick={createCouponForm.submit}
                        icon={<PlusOutlined />}>
                        Thêm
                    </Button>
                </Row>
            </Form>
        </div>
    );
}

export default CreateCouponModal;
