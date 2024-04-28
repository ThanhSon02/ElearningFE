import { Anchor, Breadcrumb, Button, Card, ConfigProvider, Menu } from "antd";
import { Link } from "react-router-dom";
import { ConvertPriceString } from "../../utils/ConvertPriceString";
import { ShoppingCartOutlined } from "@ant-design/icons";

const course_data = {
    id: 1,
    img: "/public/543600_64d1_4.jpg",
    category: "Lập trình - CNTT 1",
    course_name: "Java Basics 1",
    description:
        "Python là một ngôn ngữ lập trình bậc cao cho các mục đích lập trình đa năng. Python được thiết kế với ưu điểm mạnh là dễ đọc, dễ học và dễ nhớ. Python là ngôn ngữ có hình thức rất sáng sủa, cấu trúc rõ ràng, thuận tiện cho người mới học lập trình và là ngôn ngữ lập trình dễ học. Cấu trúc của Python còn cho phép người sử dụng viết mã lệnh với số lần gõ phím tối thiểu. Python vì vậy được dùng rộng rãi trong cộng đồng khoa học dữ liệu và đặc biệt là trong học máy và phát triển trí tuệ nhân tạo. Đến với khóa học này, các bạn sẽ được trang bị những kiến thức, kỹ năng và phương pháp lập trình sử dụng các tính năng cốt lõi của Python như cú pháp câu lệnh, biến và các kiểu dữ liệu cơ bản, vòng lặp, hàm dựng sẵn và nhiều tính năng khác. Đồng thời, các bạn sẽ tự tay viết và chạy chương trình của chính mình bằng những công cụ lập trình Python chuyên nghiệp như PyCharm và Google Colab.",
    author: "Trần Thanh Sơn",
    price: 399999,
    sale_price: 199999,
};
function Detail() {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Anchor: {
                        padding: "20px",
                        linkPaddingBlock: "10px",
                    },
                    Menu: {},
                },
            }}>
            <div className="w-full">
                <div className="w-full mb-5 py-3 border-b-[1px]">
                    <Breadcrumb className="mt-3">
                        <Breadcrumb.Item
                            href="/"
                            className="text-base text-black">
                            Trang chủ
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="/my_course">
                            Khoá học của tôi
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="font-semibold text-3xl my-3 text-[#082346]">
                        Tiếng Anh giao tiếp thu ngân bán hàng
                    </h1>
                    <p className="w-2/3 font-medium text-">
                        Các nhà hàng và trung tâm thương mại luôn là điểm đến
                        yêu thích của nhiều người. Với những nhà hàng phục vụ
                        khách nước ngoài thì tiếng Anh là một công cụ giao tiếp
                        không thể thiếu của nhân viên thu ngân. Để làm việc
                        trong môi trường chuyên nghiệp thì đòi hỏi chúng ta phải
                        luôn cố gắng trau dồi kỹ năng giao tiếp tiếng Anh, vừa
                        phục vụ công việc, vừa có thể giúp bản thân nhanh thăng
                        tiến.
                    </p>
                </div>
                <div className="flex gap-10">
                    <div className="w-2/3">
                        <div className="flex flex-col gap-5 ">
                            <div id="part-1" className="scroll-mt-[1000px]">
                                <h3 className="text-xl font-semibold text-[#082346]">
                                    Mô tả khoá học
                                </h3>
                                <p>
                                    Các nhà hàng và trung tâm thương mại luôn là
                                    điểm đến yêu thích của nhiều người. Với
                                    những nhà hàng phục vụ khách nước ngoài thì
                                    tiếng Anh là một công cụ giao tiếp không thể
                                    thiếu của nhân viên thu ngân. Để làm việc
                                    trong môi trường chuyên nghiệp thì đòi hỏi
                                    chúng ta phải luôn cố gắng trau dồi kỹ năng
                                    giao tiếp tiếng Anh, vừa phục vụ công việc,
                                    vừa có thể giúp bản thân nhanh thăng tiến.
                                </p>
                            </div>
                            <div id="part-2" className="scroll-mt-[1000px]">
                                <h3 className="text-xl font-semibold text-[#082346]">
                                    Lộ trình khoá học
                                </h3>
                                <Menu mode="inline">
                                    <Menu.SubMenu title="Chương 1">
                                        <Menu.Item>
                                            <Link>Bài 1: Phân dạng</Link>
                                        </Menu.Item>
                                    </Menu.SubMenu>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-1/3 bg-white rounded-xl overflow-hidden">
                        <div className="w-full bg-[url('/public/543600_64d1_4.jpg')] bg-cover h-[200px] bg-no-repeat bg-center"></div>
                        <div className="w-full p-4">
                            <h3 className="uppercase font-bold text-amber-500">
                                {course_data?.category}
                            </h3>
                            <h2 className="font-semibold text-blue-900 text-xl">
                                {course_data?.course_name}
                            </h2>
                            <div>
                                <div className="flex gap-2 font-bold text-xl ">
                                    <p className="text-red-600 text line-through">
                                        {ConvertPriceString(
                                            course_data?.sale_price
                                        )}
                                        đ
                                    </p>
                                    <p>
                                        {ConvertPriceString(course_data?.price)}
                                        đ
                                    </p>
                                </div>
                                <div className="w-full py-2 px-4 border-[1px] rounded-2xl font-medium text-lg flex gap-2 justify-center items-center mt-4 cursor-pointer">
                                    <ShoppingCartOutlined />
                                    <span>Thêm vào giỏ hàng</span>
                                </div>
                                <div className="w-full py-2 px-4 border-[1px] rounded-2xl font-medium text-lg text-center mt-4 cursor-pointer bg-[#FCCF00]">
                                    <span>Thêm vào giỏ hàng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}

export default Detail;
