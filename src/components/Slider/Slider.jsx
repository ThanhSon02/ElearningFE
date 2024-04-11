import Slider from "react-slick";
import NextButton from "../Button/SliderButton/NextButton";
import PrevButton from "../Button/SliderButton/PrevButton";

function SliderCustom() {
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
                    slidesToShow: 5,
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
        <div className="px-6">
            <div className="w-full">
                <Slider {...settings} className="flex items-center">
                    <div className="w-fit h-fit">
                        <img src="/public/slider1.jpg" alt="slider1" />
                    </div>
                    <div className="w-fit h-fit">
                        <img src="/public/slider2.jpg" alt="slider2" />
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default SliderCustom;
