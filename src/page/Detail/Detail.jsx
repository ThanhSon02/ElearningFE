import { Breadcrumb, Button, Collapse } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ConvertPriceString } from "../../utils/ConvertPriceString";
import {
    ShoppingCartOutlined,
    PlayCircleOutlined,
    FieldTimeOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/Slice/cartSlice";
import ConvertSecondToHms from "../../utils/ConvertSecondToHms";
import { createOrder } from "../../redux/Slice/orderSlice";
import { useEffect } from "react";
import { getCourseById } from "../../redux/Slice/appSlice";

function Detail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const courseData = useSelector((state) => state.app?.data?.courseSelected);

    const sectionCollape = courseData?.sectionResList.map((section) => {
        const container = {};
        container.key = section?.sectionId;
        container.label = (
            <span className="font-semibold text-base">
                {section?.sectionName}
            </span>
        );
        container.children = (
            <div className="flex flex-col gap-4">
                {section?.lectureResList.map((lecture) => (
                    <div key={lecture?.id} className="flex justify-between">
                        <div className="flex gap-3 items-center">
                            <PlayCircleOutlined />
                            {lecture?.lectureName}
                        </div>
                        <div>{ConvertSecondToHms(lecture?.videoDuration)}</div>
                    </div>
                ))}
            </div>
        );
        return container;
    });

    return (
        <div className="w-full min-h-[495px] px-6 flex flex-col justify-center items-center">
            <div className="w-full p-3">
                <Breadcrumb className="">
                    <Breadcrumb.Item href="/" className="text-base text-black">
                        Trang chủ
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Khoá học của tôi</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="w-full flex gap-5 rounded-lg">
                <div className="flex-1 bg-white p-3 rounded-lg shadow-lg">
                    <h3 className="text-2xl text-[#082346] font-semibold uppercase mb-2">
                        {courseData?.courseName}
                    </h3>
                    <div className="flex gap-2 mb-6">
                        <p className="font-medium text-[#082346]">Giáo viên:</p>
                        <Link>{courseData?.teacherName}</Link>
                    </div>
                    <div className="mb-3">
                        <span className="block text-[#082346] text-xl font-semibold mb-1">
                            Mô tả khoá học
                        </span>
                        <div
                            className="desc"
                            dangerouslySetInnerHTML={{
                                __html: courseData?.description,
                            }}></div>
                    </div>
                    <div className="">
                        <span className="block text-[#082346] text-xl font-semibold mb-3">
                            Lộ trình khoá học
                        </span>
                        <Collapse items={sectionCollape} />
                    </div>
                </div>
                {/* ----- */}
                <div className="w-[300px]">
                    <div className="flex flex-col items-center overflow-hidden rounded-lg bg-white shadow-lg sticky top-3">
                        <div className="w-full border-b">
                            <img
                                className="w-full object-cover"
                                src={courseData?.imageLink}
                                alt="image"
                            />
                        </div>
                        <div className="w-full overflow-hidden">
                            <div className="w-full flex flex-col items-center px-5 py-4">
                                <div className="w-full flex flex-col justify-between items-start gap-3 overflow-hidden">
                                    <div className="text-sm">
                                        <div className="w-full flex gap-2">
                                            <UserOutlined />
                                            <span>
                                                <span className="font-semibold">
                                                    1000
                                                </span>{" "}
                                                người đăng ký học
                                            </span>
                                        </div>
                                        <div className="w-full flex gap-2">
                                            <FieldTimeOutlined />
                                            <span>
                                                <span className="font-semibold">
                                                    104
                                                </span>{" "}
                                                giờ học
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full h-full flex gap-3 justify-center">
                                        <div className="text-center text-2xl font-normal line-through ">
                                            {ConvertPriceString(
                                                courseData?.price
                                            )}
                                            đ
                                        </div>
                                        <div className="text-center text-2xl font-bold text-red-600">
                                            {ConvertPriceString(
                                                courseData?.salePrice
                                            )}
                                            đ
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    onClick={() =>
                                        dispatch(addToCart(courseData))
                                    }
                                    size="large"
                                    icon={<ShoppingCartOutlined />}
                                    className="w-full mt-4 text-blue-700 hover:opacity-80 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                                    Thêm vào giỏ hàng
                                </Button>
                                <Button
                                    onClick={() => {
                                        dispatch(createOrder(courseData));
                                        navigate("/payment");
                                    }}
                                    size="large"
                                    className="w-full text-center mb-3 uppercase font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Mua ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
