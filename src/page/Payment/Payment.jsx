/* eslint-disable no-unused-vars */
import { Breadcrumb, Button, ConfigProvider, Radio } from "antd";
import { ConvertPriceString } from "../../utils/ConvertPriceString";
import { useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addConfirmOrder } from "../../redux/Slice/orderSlice";

function Payment() {
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.order?.orderList);
    const [totalPrice, setTotalPrice] = useState(() => {
        return orderList.reduce(function (init, obj) {
            return init + obj?.price;
        }, 0);
    });

    const [saleTotal, setSaleTotal] = useState(() => {
        return orderList.reduce(function (init, obj) {
            return init + obj?.salePrice;
        }, 0);
    });

    const userInfo = useSelector((state) => state?.auth?.data?.user);
    const accessToken = useSelector((state) => state?.auth?.data?.token);

    const replaceWindow = (url) => {
        window.location.replace(url);
    };

    const handlePayment = async () => {
        const confirmOrder = {
            orders: orderList,
            totalAmount: totalPrice,
            discountAmount: saleTotal,
            userInfo,
        };
        try {
            const res = await axiosInstance.get(
                `http://localhost:3001/api/payment/vn-pay?amount=${saleTotal}&bankCode=NCB`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            dispatch(addConfirmOrder(confirmOrder));
            replaceWindow(res.data?.data?.paymentData?.paymentURL);
        } catch (error) {
            toast.error(
                error.response?.data?.access_denied_reason
                    ? error.response?.data?.access_denied_reason
                    : error.response?.data?.message
            );
        }
    };

    return (
        <div className="w-full">
            <Breadcrumb className="my-3">
                <Breadcrumb.Item href="/" className="text-base text-black">
                    Trang chủ
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/my_course">Thanh Toán</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex justify-between flex-1 gap-6">
                <div className="w-full flex flex-col gap-5 bg-white p-4 rounded-lg">
                    <h1 className="font-semibold text-3xl">Thanh Toán</h1>
                    <div>
                        <h2 className="font-semibold text-lg mb-3">
                            Phương thức thanh toán
                        </h2>
                        <div className="flex flex-col gap-4">
                            <div className="p-2 border-[1px] rounded-lg">
                                <Radio checked className="flex items-center">
                                    <div className="flex items-center">
                                        <img
                                            width={120}
                                            src="/public/cong-thanh-toan-vnpay-032024.png"
                                            alt=""
                                        />
                                        <span className="ml-2 font-medium">
                                            Thanh toán qua VNPAY
                                        </span>
                                    </div>
                                </Radio>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg mb-3">
                            Đơn hàng của bạn
                        </h2>
                        {orderList.map((course) => (
                            <div key={course.id} className="w-full">
                                <div className="w-full flex justify-between items-center gap-4 border-[1px] p-2 rounded-md">
                                    <div className="min-w-[60px] max-w-28">
                                        <img
                                            src={course?.imageLink}
                                            alt="image"
                                            className="object-cover w-full"
                                        />
                                    </div>
                                    <div className="flex justify-between flex-1">
                                        <div className="text-base font-medium flex flex-col gap-2 flex-1">
                                            <div className="min-w-[400px] max-w-[700px] overflow-hidden truncate">
                                                <span className="">
                                                    {course?.courseName}
                                                </span>
                                            </div>
                                            <div className="text-xs font-normal text-[#8b8a8a]">
                                                <span>
                                                    {course?.teacherName}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <span className="line-through text-right">
                                                {ConvertPriceString(
                                                    course?.price
                                                )}
                                                đ
                                            </span>
                                            <div className="flex justify-between gap-2 items-center">
                                                <span className="text-red-500 text-base">
                                                    {Math.floor(
                                                        1 -
                                                            (course?.salePrice /
                                                                course?.price) *
                                                                100
                                                    )}
                                                    %
                                                </span>
                                                <span className="text-base font-semibold text-red-500">
                                                    {ConvertPriceString(
                                                        course?.salePrice
                                                    )}
                                                    đ
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="min-w-[400px] min-h-[400px] flex flex-col gap-5 sticky top-4">
                    <div className="w-full flex flex-col justify-around bg-[#fccf0033] p-3 rounded-lg min-h-fit">
                        <h2 className="font-semibold text-lg ">Hoá đơn</h2>
                        <div className="w-full flex-1 flex flex-col justify-around my-3">
                            <div className="text-[#545454] flex justify-between items-center border-b-[1px] border-[#DDC3A1] py-1">
                                <span>Giá chưa giảm</span>
                                <span>{ConvertPriceString(totalPrice)}đ</span>
                            </div>
                            <div className="text-[#545454] flex justify-between items-center border-b-[1px] border-[#DDC3A1] py-1">
                                <span>Giá giảm</span>
                                <span>
                                    -
                                    {ConvertPriceString(totalPrice - saleTotal)}
                                    đ
                                </span>
                            </div>

                            <div className="font-semibold flex justify-between items-center py-2 text-red-500 text-lg">
                                <span>Tổng cộng</span>
                                <span>{ConvertPriceString(saleTotal)}đ</span>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            cocolorBgContainer: "#FCCF00",
                                            defaultHoverBorderColor: "#FCCF00",
                                            textHoverBg: "#000",
                                            fontWeight: 500,
                                            defaultHoverColor: "#000",
                                        },
                                    },
                                }}>
                                <Button
                                    size="large"
                                    onClick={handlePayment}
                                    className="w-full bg-[#FCCF00] text-black font-medium mb-3">
                                    Thanh Toán
                                </Button>
                            </ConfigProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
