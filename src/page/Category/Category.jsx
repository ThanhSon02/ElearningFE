/* eslint-disable react/jsx-key */
import { Col, ConfigProvider, Input, Menu, Pagination, Radio, Row } from "antd";
import Collection from "../../components/Collection/Collection";
import Layout, { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import React from "react";
import Course from "../../components/Course/Course";
const data = [
    {
        course_name: "The Complete Python Bootcamp From Zero to Hero in Python",
        course_img: "/567828_67d0.jpg",
        teacher: "Thanh Son",
        price: 1399000,
        rating: 4.5,
    },
    {
        course_name: "The Complete Python Bootcamp From Zero to Hero in Python",
        course_img: "/567828_67d0.jpg",
        teacher: "Thanh Son",
        price: 1399000,
        rating: 4.5,
    },
    {
        course_name: "The Complete Python Bootcamp From Zero to Hero in Python",
        course_img: "/567828_67d0.jpg",
        teacher: "Thanh Son",
        price: 1399000,
        rating: 4.5,
    },
    {
        course_name: "The Complete Python Bootcamp From Zero to Hero in Python",
        course_img: "/567828_67d0.jpg",
        teacher: "Thanh Son",
        price: 1399000,
        rating: 4.5,
    },
    {
        course_name: "The Complete Python Bootcamp From Zero to Hero in Python",
        course_img: "/567828_67d0.jpg",
        teacher: "Thanh Son",
        price: 1399000,
        rating: 4.5,
    },
];

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);
        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,
            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    }
);

const data1 = [
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
        id: 2,
        img: "/public/543600_64d1_4.jpg",
        category: "Lập trình - CNTT 2",
        course_name: "Java Basics 2",
        description:
            "Python là một ngôn ngữ lập trình bậc cao cho các mục đích lập trình đa năng. Python được thiết kế với ưu điểm mạnh là dễ đọc, dễ học và dễ nhớ. Python là ngôn ngữ có hình thức rất sáng sủa, cấu trúc rõ ràng, thuận tiện cho người mới học lập trình và là ngôn ngữ lập trình dễ học. Cấu trúc của Python còn cho phép người sử dụng viết mã lệnh với số lần gõ phím tối thiểu. Python vì vậy được dùng rộng rãi trong cộng đồng khoa học dữ liệu và đặc biệt là trong học máy và phát triển trí tuệ nhân tạo. Đến với khóa học này, các bạn sẽ được trang bị những kiến thức, kỹ năng và phương pháp lập trình sử dụng các tính năng cốt lõi của Python như cú pháp câu lệnh, biến và các kiểu dữ liệu cơ bản, vòng lặp, hàm dựng sẵn và nhiều tính năng khác. Đồng thời, các bạn sẽ tự tay viết và chạy chương trình của chính mình bằng những công cụ lập trình Python chuyên nghiệp như PyCharm và Google Colab.",
        author: "Trần Thanh Sơn",
        price: 399999,
        sale_price: 199999,
    },
    {
        id: 3,
        img: "/public/543600_64d1_4.jpg",
        category: "Lập trình - CNTT 3",
        course_name: "Java Basics 3",
        description:
            "Python là một ngôn ngữ lập trình bậc cao cho các mục đích lập trình đa năng. Python được thiết kế với ưu điểm mạnh là dễ đọc, dễ học và dễ nhớ. Python là ngôn ngữ có hình thức rất sáng sủa, cấu trúc rõ ràng, thuận tiện cho người mới học lập trình và là ngôn ngữ lập trình dễ học. Cấu trúc của Python còn cho phép người sử dụng viết mã lệnh với số lần gõ phím tối thiểu. Python vì vậy được dùng rộng rãi trong cộng đồng khoa học dữ liệu và đặc biệt là trong học máy và phát triển trí tuệ nhân tạo. Đến với khóa học này, các bạn sẽ được trang bị những kiến thức, kỹ năng và phương pháp lập trình sử dụng các tính năng cốt lõi của Python như cú pháp câu lệnh, biến và các kiểu dữ liệu cơ bản, vòng lặp, hàm dựng sẵn và nhiều tính năng khác. Đồng thời, các bạn sẽ tự tay viết và chạy chương trình của chính mình bằng những công cụ lập trình Python chuyên nghiệp như PyCharm và Google Colab.",
        author: "Trần Thanh Sơn",
        price: 399999,
        sale_price: 199999,
    },
    {
        id: 4,
        img: "/public/543600_64d1_4.jpg",
        category: "Lập trình - CNTT 4",
        course_name: "Java Basics 4",
        description:
            "Python là một ngôn ngữ lập trình bậc cao cho các mục đích lập trình đa năng. Python được thiết kế với ưu điểm mạnh là dễ đọc, dễ học và dễ nhớ. Python là ngôn ngữ có hình thức rất sáng sủa, cấu trúc rõ ràng, thuận tiện cho người mới học lập trình và là ngôn ngữ lập trình dễ học. Cấu trúc của Python còn cho phép người sử dụng viết mã lệnh với số lần gõ phím tối thiểu. Python vì vậy được dùng rộng rãi trong cộng đồng khoa học dữ liệu và đặc biệt là trong học máy và phát triển trí tuệ nhân tạo. Đến với khóa học này, các bạn sẽ được trang bị những kiến thức, kỹ năng và phương pháp lập trình sử dụng các tính năng cốt lõi của Python như cú pháp câu lệnh, biến và các kiểu dữ liệu cơ bản, vòng lặp, hàm dựng sẵn và nhiều tính năng khác. Đồng thời, các bạn sẽ tự tay viết và chạy chương trình của chính mình bằng những công cụ lập trình Python chuyên nghiệp như PyCharm và Google Colab.",
        author: "Trần Thanh Sơn",
        price: 399999,
        sale_price: 199999,
    },
    {
        id: 5,
        img: "/public/543600_64d1_4.jpg",
        category: "Lập trình - CNTT 5",
        course_name: "Java Basics 5",
        description:
            "Python là một ngôn ngữ lập trình bậc cao cho các mục đích lập trình đa năng. Python được thiết kế với ưu điểm mạnh là dễ đọc, dễ học và dễ nhớ. Python là ngôn ngữ có hình thức rất sáng sủa, cấu trúc rõ ràng, thuận tiện cho người mới học lập trình và là ngôn ngữ lập trình dễ học. Cấu trúc của Python còn cho phép người sử dụng viết mã lệnh với số lần gõ phím tối thiểu. Python vì vậy được dùng rộng rãi trong cộng đồng khoa học dữ liệu và đặc biệt là trong học máy và phát triển trí tuệ nhân tạo. Đến với khóa học này, các bạn sẽ được trang bị những kiến thức, kỹ năng và phương pháp lập trình sử dụng các tính năng cốt lõi của Python như cú pháp câu lệnh, biến và các kiểu dữ liệu cơ bản, vòng lặp, hàm dựng sẵn và nhiều tính năng khác. Đồng thời, các bạn sẽ tự tay viết và chạy chương trình của chính mình bằng những công cụ lập trình Python chuyên nghiệp như PyCharm và Google Colab.",
        author: "Trần Thanh Sơn",
        price: 399999,
        sale_price: 199999,
    },
];

function Category() {
    return (
        <Layout className="w-full bg-white flex gap-3 py-3">
            <Sider
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    borderRight: "1px",
                    borderBlockEndColor: "#ccc",
                }}>
                <div>
                    <div className="text-2xl ml-3 font-medium text-blue-900">
                        Danh mục con
                    </div>
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    colorBgContainer: "#fff",
                                    activeBorderColor: "#fff",
                                    hoverBorderColor: "#fff",
                                    colorBgBlur: "#fff",
                                },
                            },
                        }}>
                        <Input
                            size="large"
                            className="rounded-b-none outline-none border-x-0 border-t-0"
                            prefix={
                                <SearchOutlined
                                    style={{ backgroundColor: "#fff" }}
                                />
                            }
                            placeholder="Tìm kiếm trong danh mục"
                        />
                        <Menu
                            className="border-none border-transparent"
                            mode="inline"
                            items={items2}
                        />
                    </ConfigProvider>
                </div>
                <div className="">
                    <div className="text-2xl ml-3 font-medium text-blue-900">
                        Lọc
                    </div>
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    colorBgContainer: "#fff",
                                    activeBorderColor: "#fff",
                                    hoverBorderColor: "#fff",
                                    colorBgBlur: "#fff",
                                },
                            },
                        }}>
                        <Input
                            size="large"
                            className="rounded-b-none outline-none border-x-0 border-t-0"
                            prefix={
                                <SearchOutlined
                                    style={{ backgroundColor: "#fff" }}
                                />
                            }
                            placeholder="Tìm kiếm trong danh mục"
                        />
                        <Menu mode="inline" items={items2} />
                    </ConfigProvider>
                </div>
            </Sider>
            <Content>
                <div>
                    <ConfigProvider
                        theme={{
                            components: {
                                Radio: {},
                            },
                        }}>
                        <Radio.Group defaultValue="a" className="flex gap-2">
                            <Radio.Button
                                className="uppercase rounded before:hidden border-[1px] font-semibold"
                                value="a">
                                Phổ biến nhất
                            </Radio.Button>
                            <Radio.Button
                                className="uppercase rounded before:hidden border-[1px] font-semibold"
                                value="b">
                                Bán chạy nhất
                            </Radio.Button>
                            <Radio.Button
                                className="uppercase rounded before:hidden border-[1px] font-semibold"
                                value="c">
                                Mới nhất
                            </Radio.Button>
                            <Radio.Button
                                className="uppercase rounded before:hidden border-[1px] font-semibold"
                                value="d">
                                Giá rẻ nhất
                            </Radio.Button>
                        </Radio.Group>
                    </ConfigProvider>
                </div>
                <div className="mt-10">
                    <Row className="">
                        {data1.map((item, index) => (
                            <Col className="mb-8" span={6}>
                                <Course course_data={item} key={index} />
                            </Col>
                        ))}
                    </Row>
                </div>
                <Pagination total={20} current={1} />
            </Content>
        </Layout>
    );
}

export default Category;
