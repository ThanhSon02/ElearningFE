import { Row, Col, Breadcrumb } from "antd";
import CourseProgress from "../../components/CourseProgress/CourseProgress";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyCourse } from "../../redux/Slice/appSlice";
function MyCourse() {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth?.data?.token);
    const userInfo = useSelector((state) => state.auth?.data?.user);
    const myCourse = useSelector((state) => state.app?.data?.myCourse);
    useEffect(() => {
        dispatch(getMyCourse({ userId: userInfo?.id, accessToken }));
    }, []);

    return (
        <div className="w-full">
            <div className="py-3">
                <Breadcrumb className="">
                    <Breadcrumb.Item href="/" className="text-base text-black">
                        Trang chủ
                    </Breadcrumb.Item>
                    <Breadcrumb.Item className="text-base text-black">
                        Khoá học của tôi
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Row gutter={12} className="bg-white p-3 rounded-lg">
                {myCourse.map((course) => (
                    <Col key={course.id} className="mb-8" span={6}>
                        <CourseProgress data={course} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default MyCourse;
