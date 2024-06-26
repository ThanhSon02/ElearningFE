import { Link } from "react-router-dom";
import { Card, Progress } from "antd";
function CourseProgress({
    // eslint-disable-next-line react/prop-types
    course_data = {
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
}) {
    return (
        <Link>
            <Card
                hoverable
                cover={<img src={course_data?.img} />}
                className="w-[300px]">
                <div className="w-full">
                    <h3 className="uppercase font-bold text-amber-500">
                        {course_data?.category}
                    </h3>
                    <h2 className="font-semibold text-blue-900 text-xl">
                        {course_data?.course_name}
                    </h2>
                    <div>
                        <p className="truncate text-gray-500 font-medium text-sm">
                            {course_data?.description}
                        </p>
                        <div className="text-black font-semibold">
                            {course_data?.author}
                        </div>
                        <div className="flex gap-2 font-bold text-xl">
                            <Progress percent={30} strokeColor={"green"} />
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

export default CourseProgress;
