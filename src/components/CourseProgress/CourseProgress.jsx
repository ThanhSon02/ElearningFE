/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Progress } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCourseErollById } from "../../redux/Slice/appSlice";
function CourseProgress({ data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.auth?.data?.user);
    const accessToken = useSelector((state) => state.auth?.data?.token);
    return (
        <div
            onClick={() => {
                dispatch(
                    getCourseErollById({
                        userId: userInfo?.id,
                        courseId: data?.id,
                        accessToken,
                    })
                );
                navigate(`/learning/${data?.id}`);
            }}
            className="w-full px-3 min-h-fit cursor-pointer">
            <div className="shadow-md rounded-lg overflow-hidden min-h-fit hover:shadow-xl">
                <div className="h-[140px] border-b-[1px]">
                    <img
                        src={data?.imageLink}
                        className="w-full object-cover h-full"
                        alt="logo"
                        sizes=""
                    />
                </div>
                <div className="px-3 pb-3 min-h-[160px] flex flex-col justify-around">
                    <h3 className="uppercase mt-2 font-medium text-amber-600">
                        {data?.categoryName}
                    </h3>
                    <h2 className="font-semibold text-base truncate">
                        {data?.courseName}
                    </h2>
                    <div>
                        <span>Giáo viên: </span>
                        <span className="text-sky-500">
                            {data?.teacherName}
                        </span>
                    </div>
                    <div className="flex gap-2 font-bold text-xl">
                        <Progress
                            percent={data.progress}
                            strokeColor={"green"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseProgress;
