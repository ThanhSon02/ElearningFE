/* eslint-disable react/prop-types */
import Slider from "react-slick";
import Course from "../Course/Course";
import NextButton from "../Button/SliderButton/NextButton";
import PrevButton from "../Button/SliderButton/PrevButton";

function Collection({ title, listItem }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        nextArrow: <NextButton />,
        prevArrow: <PrevButton />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="w-full">
            <h3 className="font-bold text-2xl mb-2 ml-1">{title}</h3>
            <div className="w-full">
                <Slider
                    {...settings}
                    className="flex items-center justify-between gap-2">
                    {listItem.map((item, index) => (
                        <Course key={index} course_data={item} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Collection;
