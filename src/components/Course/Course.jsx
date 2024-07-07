/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { ConvertPriceString } from "../../utils/ConvertPriceString";
import { useNavigate } from "react-router-dom";
import { getCourseById } from "../../redux/Slice/appSlice";

function Course({ courseData }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(courseData);
    return (
        <div
            onClick={() => {
                dispatch(getCourseById({ id: courseData?.id }));
                navigate(`/detail/${courseData?.id}`);
            }}
            // to={`/detail/${courseData?.id}`}
            // state={courseData?.id}
            className="w-full px-3 h-[304px] cursor-pointer">
            <div className="shadow-md rounded-lg overflow-hidden min-h-full hover:shadow-xl">
                <div className="h-[140px] border-b-[1px]">
                    <img
                        src={courseData?.imageLink}
                        className="w-full object-cover h-full"
                        alt="logo"
                    />
                </div>
                <div className="px-3 pb-3 min-h-[160px] flex flex-col justify-around">
                    <h3 className="uppercase mt-2 font-medium text-amber-600">
                        {courseData?.categoryName}
                    </h3>
                    <h2 className="font-semibold text-base truncate">
                        {courseData?.courseName}
                    </h2>
                    <div>
                        <span>Giáo viên: </span>
                        <span className="text-sky-500">
                            {courseData?.teacherName}
                        </span>
                    </div>
                    <div className="">
                        <span className="text-xl font-medium text-red-600">
                            {ConvertPriceString(courseData?.salePrice)}đ
                        </span>
                        <div className="flex gap-2 text-base font-normal">
                            <span className="">-50%</span>
                            <span className="line-through text-stone-400">
                                {ConvertPriceString(courseData?.price)}đ
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course;
