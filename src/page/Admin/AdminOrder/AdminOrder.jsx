import { ConfigProvider, Table } from "antd";
import { useEffect, useState } from "react";
import { ConvertPriceString } from "../../../utils/ConvertPriceString";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrder } from "../../../redux/Slice/adminSlice";
function AdminOrder() {
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 100,
            render: (_, record, index) => <span>{++index}</span>,
        },
        {
            title: "Mã đơn hàng",
            key: "transactionNo",
            dataIndex: "transactionNo",
        },
        {
            title: "Khoá học",
            key: "courseName",
            dataIndex: "courseName",
        },
        {
            title: "Thành tiền",
            key: "price",
            dataIndex: "price",
            render: (_, record) => (
                <span style={{ color: "green", fontWeight: 500 }}>
                    {ConvertPriceString(record.discountAmount)}
                    <span>(đ)</span>
                </span>
            ),
        },
        {
            title: "Mã ngân hàng",
            dataIndex: "bankCode",
            key: "bankCode",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(
        (state) => state.admin?.data?.loginData?.token
    );
    useEffect(() => {
        dispatch(getAllOrder({ navigate, accessToken }));
    }, []);

    const allOrder = useSelector((state) => state.admin?.data?.orderData);

    return (
        <ConfigProvider>
            <div className="flex flex-col w-full bg-white px-5 shadow-lg">
                <div className="bg-white flex py-5 justify-between items-center">
                    <h1 className="font-medium text-lg mb-3">Đơn hàng</h1>
                </div>
                <Table
                    style={{ width: "100%" }}
                    columns={columns}
                    dataSource={allOrder}
                    onRow={(record) => {
                        return {
                            onClick: () => {},
                        };
                    }}
                />
            </div>
        </ConfigProvider>
    );
}

export default AdminOrder;
