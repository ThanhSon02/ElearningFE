import { Carousel, Menu } from "antd";
import Collection from "./../../components/Collection/Collection";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { getAllCategory, getAllCourse } from "../../redux/Slice/appSlice";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCourse());
        dispatch(getAllCategory());
    }, []);

    const courseData = useSelector((state) =>
        state.app.data?.course ? state.app.data?.course : []
    );
    // useEffect(() => {
    //     axiosInstance
    //         .get("/book/hot")
    //         .then((result) => {
    //             setHotCourse(result.data.listBook);
    //         })
    //         .catch((error) => {
    //             console.log(error.response.data.message);
    //         });
    // }, []);

    // useEffect(() => {
    //     axiosInstance
    //         .get("/book/best_seller")
    //         .then((result) => {
    //             setBestSellerCourse(result.data.listBook);
    //         })
    //         .catch((error) => {
    //             console.log(error.response.data.message);
    //         });
    // }, []);

    // useEffect(() => {
    //     axiosInstance
    //         .get("/book/new")
    //         .then((result) => {
    //             setNewCourse(result.data.listBook);
    //         })
    //         .catch((error) => {
    //             console.log(error.response.data.message);
    //         });
    // }, []);
    const allCategory = useSelector((state) =>
        state.app?.data?.category ? state.app?.data?.category : []
    );

    const carouselRef = useRef();

    return (
        <div className="flex justify-between gap-6 mt-3 mx-6">
            <section
                className="w-[300px] rounded-lg bg-white overflow-auto max-h-screen sticky top-0"
                style={{ scrollbarWidth: "none" }}>
                <h3
                    className="px-5 py-3 font-medium"
                    style={{
                        borderInlineEnd: "1px solid rgba(5, 5, 5, 0.06)",
                    }}>
                    Danh Mục
                </h3>
                <Menu className="text-base">
                    {allCategory.map((category, index) => (
                        <Menu.Item key={index}>
                            <Link
                                to={`/category/${category?.id}`}
                                state={category?.id}
                                className="text-wrap">
                                {category?.categoryName}
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </section>
            <section
                className="flex flex-col gap-6"
                style={{ width: "calc(100vw - 300px)" }}>
                <div className="w-full relative">
                    <div
                        className="absolute z-10 left-0 top-1/2 bg-[#e1e1e1] rounded-[50%] hover:bg-white"
                        onClick={() => carouselRef.current.prev()}>
                        <LeftOutlined className="p-3 text-sky-600 font-bold hover:text-blue-600" />
                    </div>
                    <Carousel
                        dots={false}
                        autoplay
                        arrows={false}
                        ref={carouselRef}
                        className="flex items-center w-full py-3 px-4  rounded-lg bg-white">
                        <div className="w-fit ">
                            <img src="/public/63898019af47c60040e48ea7.jpg" />
                        </div>
                        <div className="w-fit">
                            <img src="/public/63898019af47c60040e48ea7.jpg" />
                        </div>
                    </Carousel>
                    <div
                        className="absolute z-10 right-0 top-1/2 shadow-md bg-[#e1e1e1] rounded-[50%] hover:bg-white"
                        onClick={() => carouselRef.current.next()}>
                        <RightOutlined className="p-3 text-sky-600 font-bold hover:text-blue-600" />
                    </div>
                </div>
                <div className="h-full w-full">
                    <Collection
                        listItem={courseData}
                        title={"Tất cả khoá học"}
                    />
                    <Collection listItem={courseData} title={"Ngoại ngữ"} />
                </div>
            </section>
        </div>
    );
}

export default Home;
