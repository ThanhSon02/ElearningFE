import { Col, Row } from "antd";
import {
    BiGroup,
    BiBookOpen,
    BiLineChart,
    BiLogInCircle,
} from "react-icons/bi";
function AdminDashBoard() {
    return (
        <Row className="w-full px-10 py-4" gutter={16}>
            <Col span={6} className="flex justify-center items-center">
                <div className="flex items-center justify-between gap-2 text-white font-medium rounded-sm p-2 w-full bg-gradient-to-l from-[#5C258D] to-[#4389A2]">
                    <div className="text-base flex-1">
                        <p>Học viên</p>
                        <p>1.000</p>
                    </div>
                    <div>
                        <BiGroup size={44} color="#fff" />
                    </div>
                </div>
            </Col>
            <Col span={6} className="flex justify-center items-center ">
                <div className="flex items-center justify-between gap-2 text-white font-medium rounded-sm p-2 w-full bg-gradient-to-l from-[#654ea3] to-[#eaafc8]">
                    <div className="text-base flex-1">
                        <p>Khoá học</p>
                        <p>100</p>
                    </div>
                    <div>
                        <BiBookOpen size={44} color="#fff" />
                    </div>
                </div>
            </Col>
            <Col span={6} className="flex justify-center items-center ">
                <div className="flex items-center justify-between gap-2 text-white font-medium rounded-sm p-2 w-full bg-gradient-to-l from-[#544a7d] to-[#ffd452]">
                    <div className="text-base flex-1">
                        <p>Doanh số</p>
                        <p>100M</p>
                    </div>
                    <div>
                        <BiLineChart size={44} color="#fff" />
                    </div>
                </div>
            </Col>
            <Col span={6} className="flex justify-center items-center ">
                <div className="flex items-center justify-between gap-2 text-white font-medium rounded-sm p-2 w-full bg-gradient-to-l from-[#8A2387] via-[#E94057] to-[#F27121]">
                    <div className="text-base flex-1">
                        <p>Online</p>
                        <p>400</p>
                    </div>
                    <div>
                        <BiLogInCircle size={44} color="#fff" />
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default AdminDashBoard;
