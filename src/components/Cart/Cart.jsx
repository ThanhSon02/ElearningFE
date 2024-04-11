import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

function Cart() {
    return (
        <div className="bg-transparent w-fit">
            <div className="overflow-auto h-[390px] flex flex-col gap-2">
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
            <div className="flex flex-col gap-3 w-full justify-center p-5">
                <div className="gap-2 flex text-xl text-left">
                    <span className="font-bold">Thành tiền:</span>
                    <span className="font-bold">10000000đ</span>
                </div>
                <Link
                    to={"/cart"}
                    className="px-4 py-3 text-white font-bold bg-[#2d2f31] text-center hover:bg-slate-400">
                    Đến giỏ hàng
                </Link>
            </div>
        </div>
    );
}

export default Cart;
