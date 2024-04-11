import { Breadcrumb, Flex, Checkbox, Button } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, CloseOutlined } from "@ant-design/icons";
import CartItemPage from "../../components/Cart/CartItemPage/CartItemPage";
import { ConvertPriceString } from "../../utils/ConvertPriceString";
function CartPage() {
    const plainOptions = [
        <Link key={1} to={"/"}>
            apple
        </Link>,
        "Pear",
        "Orange",
    ];

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

    return (
        <div className="w-full">
            <Breadcrumb className="mt-3">
                <Breadcrumb.Item href="/" className="text-base text-black">
                    Trang chủ
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/my_course">Giỏ hàng</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Giỏ hàng</h1>
            <Flex>
                <div>
                    <p>Bạn đang có 1 sản phẩm trong giỏ hàng</p>
                    <Flex>
                        <Checkbox className="bg-white p-4 rounded">
                            <div className="flex gap-4 ">
                                <img
                                    className="w-[200px] block"
                                    src={course_data?.img}
                                />
                                <div className="w-full flex flex-col justify-between">
                                    <div className="flex items-center justify-between gap-10">
                                        <div className="py-1 flex-1">
                                            <h2 className="font-bold text-2xl">
                                                {course_data?.course_name}
                                            </h2>
                                        </div>
                                        <div className="flex items-start">
                                            <Button
                                                icon={<HeartOutlined />}
                                                type="link"
                                            />
                                            <Button
                                                icon={<CloseOutlined />}
                                                type="link"
                                            />
                                        </div>
                                    </div>
                                    <p className="font-semibold">
                                        {course_data?.author}
                                    </p>
                                    <p className="line-through text-end text-base">
                                        {ConvertPriceString(
                                            course_data?.sale_price
                                        )}
                                        đ
                                    </p>
                                    <p className="text-end text-2xl font-semibold text-red-600">
                                        {ConvertPriceString(course_data?.price)}
                                        đ
                                    </p>
                                </div>
                            </div>
                        </Checkbox>
                    </Flex>
                </div>
                <div></div>
            </Flex>
        </div>
    );
}

export default CartPage;
