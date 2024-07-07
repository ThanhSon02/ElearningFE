/* eslint-disable no-unused-vars */
import { Breadcrumb, Flex, Button, ConfigProvider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ConvertPriceString } from "../../utils/ConvertPriceString";
import "./CartPage.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/Slice/cartSlice";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/Slice/orderSlice";
function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartList = useSelector((state) =>
        state.cart?.cartList ? state.cart?.cartList : []
    );

    const [totalPrice, setTotalPrice] = useState(() => {
        return cartList.reduce(function (init, obj) {
            return init + obj?.price;
        }, 0);
    });

    const [saleTotal, setSaleTotal] = useState(() => {
        return cartList.reduce(function (init, obj) {
            return init + obj?.salePrice;
        }, 0);
    });

    const [total, setTotal] = useState(() => totalPrice - saleTotal);

    return (
        <div className="w-full px-[50px]">
            <Breadcrumb className="my-3 text-base text-black">
                <Breadcrumb.Item className="text-2xl font-semibold">
                    Giỏ hàng
                </Breadcrumb.Item>
            </Breadcrumb>
            {cartList.length > 0 ? (
                <Flex gap={20} className="bg-[#f5f5fa] rounded-lg">
                    {cartList.length !== 0 ? (
                        <div className="w-3/5 bg-white p-3 rounded-lg">
                            <div className="flex justify-between items-center px-3">
                                <div className="text-lg font-medium pb-2 mb-2">
                                    <span>Bạn đang có </span>
                                    <span className="text-red-500">
                                        {cartList.length}
                                    </span>
                                    <span> sản phẩm trong giỏ hàng</span>
                                </div>
                            </div>
                            <Flex gap={18} vertical className="w-full">
                                <div className="rounded w-full flex flex-col gap-5">
                                    {cartList.map((item) => (
                                        <div
                                            key={item?.id}
                                            className="flex justify-between w-full px-3 py-2 h-fit ">
                                            <div className="w-full flex justify-between gap-4">
                                                <div className="flex justify-start items-center">
                                                    <img
                                                        className="w-[208px] block object-fill"
                                                        src={item?.imageLink}
                                                    />
                                                </div>
                                                <div className="w-full flex flex-col justify-between flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div className="py-1 flex-1">
                                                            <span className="font-bold text-xl truncate">
                                                                {
                                                                    item?.courseName
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex items-start">
                                                            <Button
                                                                onClick={() =>
                                                                    dispatch(
                                                                        removeFromCart(
                                                                            item
                                                                        )
                                                                    )
                                                                }
                                                                icon={
                                                                    <DeleteOutlined />
                                                                }
                                                                type="default"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-medium text-sky-400">
                                                        <span>
                                                            {item.teacherName}
                                                        </span>
                                                    </div>
                                                    <span className="line-through text-end text-base">
                                                        {ConvertPriceString(
                                                            item?.price
                                                        )}
                                                        đ
                                                    </span>
                                                    <span className="text-end text-xl font-semibold text-red-600">
                                                        {ConvertPriceString(
                                                            item?.salePrice
                                                        )}
                                                        đ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Flex>
                        </div>
                    ) : (
                        <div className="w-3/5 bg-white p-3 rounded-lg"></div>
                    )}
                    <div className="w-2/5">
                        <Flex
                            vertical
                            className="bg-[#fccf0033] rounded-lg py-3 px-3 min-h-[300px] justify-between">
                            <h2 className="font-semibold text-xl mb-4">
                                Hoá đơn
                            </h2>
                            <div className="py-3 border-b-[1px] border-stone-600 text-[#545454] flex justify-between items-center text-lg font-semibold">
                                <span>Tạm tính</span>
                                <span className="">
                                    {ConvertPriceString(saleTotal)}đ
                                </span>
                            </div>
                            <div className="py-3 border-b-[1px] border-stone-600 text-[#545454] flex justify-between items-center text-lg font-semibold">
                                <span>Giảm giá</span>
                                <span>
                                    -{" "}
                                    {ConvertPriceString(totalPrice - saleTotal)}
                                    đ
                                </span>
                            </div>
                            <div className="py-3 text-lg font-semibold text-slate-900 flex justify-between items-center">
                                <span>Tổng tiền</span>
                                <span className="text-red-600 text-2xl">
                                    {ConvertPriceString(total)}đ
                                </span>
                            </div>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            colorBgContainer: "#FCCF00",
                                            colorBorder: "#FCCF00",
                                            defaultHoverBorderColor: "#FCCF00",
                                            defaultColor: "#FCCF00",
                                            fontWeight: 500,
                                            defaultHoverColor: "black",
                                        },
                                    },
                                }}>
                                <Button
                                    size="large"
                                    onClick={() => {
                                        dispatch(createOrder(cartList));
                                        navigate("/payment");
                                    }}
                                    className="bg-[#FCCF00] text-black hover:opacity-75 uppercase text-center rounded-md px-4 py-2">
                                    Thanh toán
                                </Button>
                            </ConfigProvider>
                        </Flex>
                    </div>
                </Flex>
            ) : (
                <div className="flex flex-col justify-center bg-white w-full items-center rounded-lg shadow-lg p-6 min-h-[500px] gap-5">
                    <div className="">
                        <img
                            src="/public/shopping.png"
                            alt="shoping"
                            className="object-cover"
                        />
                    </div>
                    <span className="text-2xl font-bold">Giỏ hàng trống</span>
                </div>
            )}
        </div>
    );
}

export default CartPage;
