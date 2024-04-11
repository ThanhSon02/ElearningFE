function CartItem() {
    return (
        <div className="flex gap-2  border-b-2 items-center justify-between hover:bg-zinc-300">
            <div className="w-16 h-16">
                <img src="/543600_64d1_4.jpg" alt="img" />
            </div>
            <div className="flex flex-col w-52">
                <h3 className="truncate font-semibold mb-1">
                    Tên khoá học dejwofhjowefowejfoweofewohn
                </h3>
                <span className="font-semibold text-xs">giáo viên</span>
                <span className="font-semibold text-sm">100000đ</span>
            </div>
        </div>
    );
}

export default CartItem;
