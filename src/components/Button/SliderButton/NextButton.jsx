import { IoIosArrowForward } from "react-icons/io";
// eslint-disable-next-line react/prop-types
function NextButton({ onClick }) {
    return (
        <div
            className="bg-[#2d2f31] w-8 h-8 rounded-full absolute right-4 z-10 hover:bg-slate-700"
            onClick={onClick}>
            <IoIosArrowForward size={32} fill="#d1d7dc" />
        </div>
    );
}

export default NextButton;
