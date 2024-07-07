import { Divider, Menu } from "antd";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState } from "react";

function Learning() {
    const courseLearning = useSelector(
        (state) => state.app?.data?.courseLearning
    );
    console.log(courseLearning);
    const [videoUrl, setVideoUrl] = useState(
        "https://youtu.be/e5Hc2B50Z7c?si=WXR_HXaUfC7KEq3T"
    );
    const [title, setTitle] = useState(null);
    const handleGetVideo = (videoFileName, lectureName) => {
        setVideoUrl(
            `http://localhost:3001/public/api/video/${
                videoFileName.split(".")[0]
            }`
        );
        setTitle(lectureName);
    };

    return (
        <div className="w-full px-4">
            <div className="w-full p-4 flex gap-6">
                <div className="w-full bg-white rounded-md p-4">
                    <div className="w-full min-h-[400px]">
                        <ReactPlayer
                            height={550}
                            width={"100%"}
                            style={{}}
                            controls={true}
                            url={videoUrl}
                        />
                    </div>
                    <div className="mt-3">
                        <h2 className="text-4xl font-bold">
                            {title || courseLearning?.courseName}
                        </h2>
                    </div>

                    <Divider />
                    <div className="text-lg">
                        <span>Giảng viên: </span>
                        <span>{courseLearning?.teacherName}</span>
                    </div>
                    <Divider />
                    <div className="text-lg mt-3">
                        <span>Mô tả: </span>
                        <span
                            className="text-base"
                            dangerouslySetInnerHTML={{
                                __html: courseLearning.description,
                            }}></span>
                    </div>
                </div>
                <div>
                    <div
                        style={{ scrollbarWidth: "none" }}
                        className="bg-white max-h-[500px] overflow-auto min-w-[400px] rounded-lg">
                        {courseLearning?.sectionResList.length > 0 ? (
                            <Menu mode="inline" className="font-medium">
                                {courseLearning?.sectionResList.map(
                                    (section, index) => (
                                        <Menu.SubMenu
                                            key={section?.id}
                                            title={
                                                `Chương ${index + 1}: ` +
                                                section?.sectionName
                                            }>
                                            {section?.lectureResList.map(
                                                (lecture, index) => (
                                                    <Menu.Item
                                                        onClick={() =>
                                                            handleGetVideo(
                                                                lecture.lectureVideo,
                                                                lecture.lectureName
                                                            )
                                                        }
                                                        key={lecture?.id}>
                                                        Bài {index + 1}
                                                        {": "}
                                                        {lecture?.lectureName}
                                                    </Menu.Item>
                                                )
                                            )}
                                        </Menu.SubMenu>
                                    )
                                )}
                            </Menu>
                        ) : (
                            <div className="w-full bg-white min-h-[200px] flex justify-center items-center">
                                <h2>Khoá học chưa được cập nhật bài giảng</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Learning;
