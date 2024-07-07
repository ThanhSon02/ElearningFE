import { Col, Divider, Row } from "antd";
import { useEffect } from "react";
import {
    BiGroup,
    BiBookOpen,
    BiLineChart,
    BiLogInCircle,
} from "react-icons/bi";
import { ArrowRightOutlined } from "@ant-design/icons";
import {
    getAllCategoryAdmin,
    getAllCourseAdmin,
    getAllLecture,
    getAllSection,
    getAllUser,
} from "../../../redux/Slice/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
function AdminDashBoard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(
        (state) => state.admin?.data?.loginData?.token
    );
    useEffect(() => {
        dispatch(getAllCategoryAdmin({ navigate }));
        dispatch(getAllCourseAdmin({ navigate }));
        dispatch(getAllUser({ navigate, accessToken }));
        dispatch(getAllSection({ navigate, accessToken }));
        dispatch(getAllLecture({ navigate, accessToken }));
    }, []);

    return (
        <div className="w-full p-5">
            <div className="w-full flex justify-between items-center gap-2 text-white">
                <div className="w-full flex justify-center items-center rounded-lg bg-[#1677FF]">
                    <div className="w-full flex flex-col p-2">
                        <div className="w-full flex text-base uppercase font-medium">
                            <span>Học viên</span>
                        </div>
                        <div className="w-full flex justify-between items-center text-2xl font-medium">
                            <span>1.000</span>
                            <BiGroup size={34} color="#fff" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center rounded-lg bg-[#52C41A]">
                    <div className=" w-full flex flex-col p-2">
                        <div className="w-full flex justify-between text-base uppercase font-medium">
                            <span>Giáo viên</span>
                        </div>
                        <div className="w-full flex justify-between items-center text-2xl font-medium">
                            <span>100</span>
                            <BiBookOpen size={34} color="#fff" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center rounded-lg bg-[#FAAD14]">
                    <div className=" w-full flex flex-col p-2">
                        <div className="w-full flex justify-between text-base uppercase font-medium">
                            <span>Khoá học</span>
                        </div>
                        <div className="w-full flex justify-between items-center text-2xl font-medium">
                            <span>100M</span>
                            <BiLineChart size={34} color="#fff" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center rounded-lg bg-[#FF4D4F]">
                    <div className=" w-full flex flex-col p-2">
                        <div className="w-full flex justify-between text-base uppercase font-medium">
                            <span>Doanh số</span>
                        </div>
                        <div className="w-full flex justify-between items-center text-2xl font-medium">
                            <span>400</span>
                            <BiLogInCircle size={34} color="#fff" />
                        </div>
                    </div>
                </div>
            </div>
            <Divider />
            <div className="w-full flex flex-col justify-center items-center gap-6 text-white">
                <div className="w-full grid grid-cols-4 gap-6">
                    <Link
                        to={"/admin/user"}
                        className="justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <span>Người dùng</span>
                        <ArrowRightOutlined />
                    </Link>
                    <Link
                        to={"/admin/course"}
                        className="justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <span>Khoá học</span>
                        <ArrowRightOutlined />
                    </Link>
                    <Link
                        to={"/admin/section"}
                        className="justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <span>Học phần</span>
                        <ArrowRightOutlined />
                    </Link>
                    <Link
                        to={"/admin/lecture"}
                        className="justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <span>Bài giảng</span>
                        <ArrowRightOutlined />
                    </Link>
                </div>
                <div className="w-full grid grid-cols-4 gap-6">
                    <Link
                        to={"/admin/category"}
                        className="justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <span>Danh mục</span>
                        <ArrowRightOutlined />
                    </Link>
                    <Link
                        to={"/admin/coupon"}
                        className="justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <span>Mã khuyến mại</span>
                        <ArrowRightOutlined />
                    </Link>
                    <Link
                        to={"/admin/order"}
                        className="justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <span>Đơn hàng</span>
                        <ArrowRightOutlined />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminDashBoard;
