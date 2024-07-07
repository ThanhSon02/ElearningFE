/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearOrder } from "../../redux/Slice/orderSlice";
import { clearCart } from "../../redux/Slice/cartSlice";

function PaymentResult() {
    const dispatch = useDispatch();

    const accessToken = useSelector((state) => state.auth?.data?.token);
    const confirmOrder = useSelector((state) => state.order?.orderInfo);
    const [success, setSuccess] = useState(false);
    const location = useLocation();
    useEffect(() => {
        axiosInstance
            .post(
                "/api/payment/vn-pay-callback" + location.search,
                confirmOrder,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            )
            .then((response) => {
                if (response.data?.data?.status === "00") {
                    dispatch(clearOrder());
                    dispatch(clearCart());
                    setSuccess(true);
                } else {
                    setSuccess(false);
                }
            })
            .catch((error) => {
                toast.error(error.data?.message);
            });
    }, []);
    return (
        <div className="w-full">
            {success ? (
                <div className="w-full mt-4 bg-white rounded-md min-h-[470px] flex justify-center items-center">
                    <Result
                        status="success"
                        title="Thanh toán thành công"
                        extra={[
                            <Link key={"home"} to={"/"}>
                                <Button type="primary" key="console">
                                    Trở lại trang chủ
                                </Button>
                            </Link>,
                        ]}
                    />
                </div>
            ) : (
                <div className="w-full mt-4 bg-white rounded-md min-h-[470px] flex justify-center items-center">
                    <Result
                        status="warning"
                        title="Thanh toán không thành công"
                        extra={[
                            <Link key={"home"} to={"/"}>
                                <Button type="primary" key="console">
                                    Trở lại trang chủ
                                </Button>
                            </Link>,
                        ]}
                    />
                </div>
            )}
        </div>
    );
}

export default PaymentResult;
