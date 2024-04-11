/* eslint-disable react/prop-types */
import { IoIosArrowBack } from "react-icons/io";
function PrevButton({ onClick }) {
    return (
        <div
            className="bg-[#2d2f31] w-8 h-8 rounded-full absolute left-4 z-10 hover:bg-slate-700"
            onClick={onClick}>
            <IoIosArrowBack size={32} fill="#d1d7dc" />
        </div>
    );
}

export default PrevButton;
