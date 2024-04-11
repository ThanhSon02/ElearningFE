/* eslint-disable react/prop-types */

import { Card } from "antd";
import { ConvertPriceString } from "../../utils/ConvertPriceString";

/* eslint-disable no-unused-vars */

function Course({ course_data }) {
    return (
        <Card
            hoverable
            cover={<img src={course_data?.img} />}
            className="w-[260px]">
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
                        <p className="text-red-600 text line-through">
                            {ConvertPriceString(course_data?.sale_price)}đ
                        </p>
                        <p>{ConvertPriceString(course_data?.price)}đ</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default Course;
