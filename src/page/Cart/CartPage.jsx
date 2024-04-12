import { Breadcrumb, Flex, Checkbox, Button, ConfigProvider } from "antd";
import { HeartOutlined, CloseOutlined } from "@ant-design/icons";
import { ConvertPriceString } from "../../utils/ConvertPriceString";
import "./CartPage.css";
import { useState } from "react";
function CartPage() {
    const [checked, setChecked] = useState([]);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);

    const course_data = [
        {
            id: 1,
            img: "/public/543600_64d1_4.jpg",
            category: "Lập trình - CNTT 1",
            course_name: "Java Basics 1",
            description:
                "Python là một ngôn ngữ lập trình bậc cao cho các mục đích lập trình đa năng. Python được thiết kế với ưu điểm mạnh là dễ đọc, dễ học và dễ nhớ. Python là ngôn ngữ có hình thức rất sáng sủa, cấu trúc rõ ràng, thuận tiện cho người mới học lập trình và là ngôn ngữ lập trình dễ học. Cấu trúc của Python còn cho phép người sử dụng viết mã lệnh với số lần gõ phím tối thiểu. Python vì vậy được dùng rộng rãi trong cộng đồng khoa học dữ liệu và đặc biệt là trong học máy và phát triển trí tuệ nhân tạo. Đến với khóa học này, các bạn sẽ được trang bị những kiến thức, kỹ năng và phương pháp lập trình sử dụng các tính năng cốt lõi của Python như cú pháp câu lệnh, biến và các kiểu dữ liệu cơ bản, vòng lặp, hàm dựng sẵn và nhiều tính năng khác. Đồng thời, các bạn sẽ tự tay viết và chạy chương trình của chính mình bằng những công cụ lập trình Python chuyên nghiệp như PyCharm và Google Colab.",
            author: "Trần Thanh Sơn",
            price: 399999,
            sale_price: 199999,
        },
        {
            id: 1,
            img: "/public/543600_64d1_4.jpg",
            category: "Lập trình - CNTT 1",
            course_name: "Java Basics 1",
            description:
                "Python là một ngôn ngữ lập trình bậc cao cho các mục đích lập trình đa năng. Python được thiết kế với ưu điểm mạnh là dễ đọc, dễ học và dễ nhớ. Python là ngôn ngữ có hình thức rất sáng sủa, cấu trúc rõ ràng, thuận tiện cho người mới học lập trình và là ngôn ngữ lập trình dễ học. Cấu trúc của Python còn cho phép người sử dụng viết mã lệnh với số lần gõ phím tối thiểu. Python vì vậy được dùng rộng rãi trong cộng đồng khoa học dữ liệu và đặc biệt là trong học máy và phát triển trí tuệ nhân tạo. Đến với khóa học này, các bạn sẽ được trang bị những kiến thức, kỹ năng và phương pháp lập trình sử dụng các tính năng cốt lõi của Python như cú pháp câu lệnh, biến và các kiểu dữ liệu cơ bản, vòng lặp, hàm dựng sẵn và nhiều tính năng khác. Đồng thời, các bạn sẽ tự tay viết và chạy chương trình của chính mình bằng những công cụ lập trình Python chuyên nghiệp như PyCharm và Google Colab.",
            author: "Trần Thanh Sơn",
            price: 399999,
            sale_price: 199999,
        },
        {
            id: 1,
            img: "/public/543600_64d1_4.jpg",
            category: "Lập trình - CNTT 1",
            course_name: "Java Basics 1",
            description:
                "Python là một ngôn ngữ lập trình bậc cao cho các mục đích lập trình đa năng. Python được thiết kế với ưu điểm mạnh là dễ đọc, dễ học và dễ nhớ. Python là ngôn ngữ có hình thức rất sáng sủa, cấu trúc rõ ràng, thuận tiện cho người mới học lập trình và là ngôn ngữ lập trình dễ học. Cấu trúc của Python còn cho phép người sử dụng viết mã lệnh với số lần gõ phím tối thiểu. Python vì vậy được dùng rộng rãi trong cộng đồng khoa học dữ liệu và đặc biệt là trong học máy và phát triển trí tuệ nhân tạo. Đến với khóa học này, các bạn sẽ được trang bị những kiến thức, kỹ năng và phương pháp lập trình sử dụng các tính năng cốt lõi của Python như cú pháp câu lệnh, biến và các kiểu dữ liệu cơ bản, vòng lặp, hàm dựng sẵn và nhiều tính năng khác. Đồng thời, các bạn sẽ tự tay viết và chạy chương trình của chính mình bằng những công cụ lập trình Python chuyên nghiệp như PyCharm và Google Colab.",
            author: "Trần Thanh Sơn",
            price: 399999,
            sale_price: 199999,
        },
        {
            id: 1,
            img: "/public/543600_64d1_4.jpg",
            category: "Lập trình - CNTT 1",
            course_name: "Java Basics 1",
            description:
                "Python là một ngôn ngữ lập trình bậc cao cho các mục đích lập trình đa năng. Python được thiết kế với ưu điểm mạnh là dễ đọc, dễ học và dễ nhớ. Python là ngôn ngữ có hình thức rất sáng sủa, cấu trúc rõ ràng, thuận tiện cho người mới học lập trình và là ngôn ngữ lập trình dễ học. Cấu trúc của Python còn cho phép người sử dụng viết mã lệnh với số lần gõ phím tối thiểu. Python vì vậy được dùng rộng rãi trong cộng đồng khoa học dữ liệu và đặc biệt là trong học máy và phát triển trí tuệ nhân tạo. Đến với khóa học này, các bạn sẽ được trang bị những kiến thức, kỹ năng và phương pháp lập trình sử dụng các tính năng cốt lõi của Python như cú pháp câu lệnh, biến và các kiểu dữ liệu cơ bản, vòng lặp, hàm dựng sẵn và nhiều tính năng khác. Đồng thời, các bạn sẽ tự tay viết và chạy chương trình của chính mình bằng những công cụ lập trình Python chuyên nghiệp như PyCharm và Google Colab.",
            author: "Trần Thanh Sơn",
            price: 399999,
            sale_price: 199999,
        },
    ];

    return (
        <div className="w-full">
            <Breadcrumb className="mt-3">
                <Breadcrumb.Item href="/" className="text-base text-black">
                    Trang chủ
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/my_course">Giỏ hàng</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="font-semibold text-3xl my-3">Giỏ hàng</h1>
            <Flex gap={20}>
                <div className="w-3/5 bg-white px-3 py-3 rounded-lg">
                    <p className="text-lg font-medium mb-2 ">
                        Bạn đang có 1 sản phẩm trong giỏ hàng
                    </p>
                    <Checkbox className="px-3 mb-4">Chọn tất cả</Checkbox>
                    <Flex gap={18} vertical className="w-full">
                        <Checkbox.Group className="rounded w-full flex flex-col gap-5">
                            {course_data.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 justify-between w-full px-3 rounded">
                                    <Checkbox />
                                    <div className="flex-1 flex justify-between gap-3">
                                        <img
                                            className="w-[200px] block"
                                            src={item?.img}
                                        />
                                        <div className="w-full flex flex-col justify-between">
                                            <div className="flex items-center justify-between gap-10">
                                                <div className="py-1 flex-1">
                                                    <h2 className="font-bold text-2xl truncate">
                                                        {item?.course_name}
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
                                            <p className="font-semibold truncate">
                                                {item?.author}
                                            </p>
                                            <p className="line-through text-end text-base">
                                                {ConvertPriceString(
                                                    item?.sale_price
                                                )}
                                                đ
                                            </p>
                                            <p className="text-end text-2xl font-semibold text-red-600">
                                                {ConvertPriceString(
                                                    item?.price
                                                )}
                                                đ
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Checkbox.Group>
                    </Flex>
                </div>
                <div className="w-2/5">
                    <Flex
                        vertical
                        className="bg-[#fccf0033] rounded-lg py-3 px-3">
                        <h2 className="font-semibold text-xl">Hoá đơn</h2>
                        <div className="py-3 border-b-[1px] border-stone-600 text-[#545454] flex justify-between items-center text-lg font-semibold">
                            <span>Giá chưa giảm</span>
                            <span className="">
                                {ConvertPriceString(599999)}đ
                            </span>
                        </div>
                        <div className="py-3 border-b-[1px] border-stone-600 text-[#545454] flex justify-between items-center text-lg font-semibold">
                            <span>Giá đã giảm</span>
                            <span>{ConvertPriceString(300000)}đ</span>
                        </div>
                        <div className="py-3 text-lg font-semibold text-slate-900 flex justify-between items-center">
                            <span>Tổng cộng</span>
                            <span>{ConvertPriceString(300000)}đ</span>
                        </div>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        colorBgContainer: "#FCCF00",
                                        colorBorder: "#FCCF00",
                                        defaultHoverBorderColor: "#FCCF00",
                                        defaultColor: "#FCCF00",
                                        fontWeight: 500,
                                        defaultHoverColor: "black",
                                    },
                                },
                            }}>
                            <Button className="bg-[#FCCF00] text-black hover:opacity-75 uppercase">
                                Thanh toán
                            </Button>
                        </ConfigProvider>
                    </Flex>
                </div>
            </Flex>
        </div>
    );
}

export default CartPage;
