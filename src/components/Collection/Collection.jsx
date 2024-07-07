/* eslint-disable react/prop-types */
import { useRef } from "react";
import Course from "../Course/Course";
import { Carousel } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

function Collection({ title, listItem }) {
    const carouselRef = useRef();
    return (
        <div className="w-full mb-4 px-4 py-3 rounded-lg bg-white">
            <h3 className="font-bold text-2xl mb-2 ml-2">{title}</h3>
            <div className="w-full relative">
                <div
                    className="absolute z-10 left-0 top-1/2 bg-[#e1e1e1] rounded-[50%] hover:bg-white"
                    onClick={() => carouselRef.current.prev()}>
                    <LeftOutlined className="p-3 text-sky-600 font-bold hover:text-blue-600" />
                </div>
                <Carousel
                    ref={carouselRef}
                    className="w-full"
                    slidesToShow={5}
                    arrows={false}
                    dots={false}>
                    {listItem.map((item, index) => (
                        <Course key={index} courseData={item} />
                    ))}
                </Carousel>
                <div
                    className="absolute z-10 right-0 top-1/2 shadow-md bg-[#e1e1e1] rounded-[50%] hover:bg-white"
                    onClick={() => carouselRef.current.next()}>
                    <RightOutlined className="p-3 text-sky-600 font-bold hover:text-blue-600" />
                </div>
            </div>
        </div>
    );
}

export default Collection;
