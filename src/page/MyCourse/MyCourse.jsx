import { Row, Col, Breadcrumb } from "antd";
import CourseProgress from "../../components/CourseProgress/CourseProgress";
function MyCourse() {
    return (
        <div>
            <Breadcrumb className="mt-3">
                <Breadcrumb.Item href="/" className="text-base text-black">
                    Trang chủ
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/my_course">
                    Khoá học của tôi
                </Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="font-semibold text-3xl my-3">Khoá học của tôi</h1>
            <Row gutter={12}>
                <Col className="mb-8" span={6}>
                    <CourseProgress />
                </Col>
                <Col className="mb-8" span={6}>
                    <CourseProgress />
                </Col>
                <Col className="mb-8" span={6}>
                    <CourseProgress />
                </Col>
                <Col className="mb-8" span={6}>
                    <CourseProgress />
                </Col>
                <Col className="mb-8" span={6}>
                    <CourseProgress />
                </Col>
                <Col className="mb-8" span={6}>
                    <CourseProgress />
                </Col>
            </Row>
        </div>
    );
}

export default MyCourse;
