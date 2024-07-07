/* eslint-disable no-unused-vars */
import { Button, ConfigProvider, Input, Popconfirm, Space, Table } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    deleteCourse,
    getAllCourseAdmin,
} from "../../../redux/Slice/adminSlice";
import { ConvertPriceString } from "../../../utils/ConvertPriceString";
import { Link, useNavigate } from "react-router-dom";
function AdminCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allCourse = useSelector((state) =>
        state.admin.data?.courseData != null ? state.admin.data?.courseData : []
    );
    const accessToken = useSelector(
        (state) => state.admin?.data?.loginData?.token
    );

    useEffect(() => {
        dispatch(getAllCourseAdmin({ navigate }));
    }, []);

    const [rowSelected, setRowSelected] = useState("");
    const [dataSource, setDataSource] = useState(null);

    const handleDeleteCourse = () => {
        dispatch(
            deleteCourse({ courseId: rowSelected.id, navigate, accessToken })
        );
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: "5%",
            render: (_, record, index) => <span>{++index}</span>,
        },
        {
            title: "Tên khoá học",
            key: "courseName",
            dataIndex: "courseName",
            width: "30%",
            sorter: (a, b) => a.courseName.localeCompare(b.courseName),
        },
        {
            title: "Danh mục",
            key: "category",
            dataIndex: "category",
            width: "15%",
            render: (_, record) => <span>{record?.categoryName}</span>,
            sorter: (a, b) => a.categoryName.length - b.categoryName.length,
        },
        {
            title: "Ảnh",
            key: "imageLink",
            dataIndex: "imageLink",
            render: (_, record) => (
                <div className="border-[1px]">
                    <img
                        src={record.imageLink}
                        className="w-full object-contain"
                    />
                </div>
            ),
            width: "10%",
        },
        {
            title: "Giá",
            key: "price",
            dataIndex: "price",
            render: (_, record) => (
                <span style={{ color: "green", fontWeight: 500 }}>
                    {ConvertPriceString(record.price)}
                    <span>(đ)</span>
                </span>
            ),
            sorter: (a, b) => a.price - b.price,
            width: "15%",
        },
        {
            title: "Giá sau khi giảm",
            key: "salePrice",
            dataIndex: "salePrice",
            render: (_, record) => (
                <span style={{ color: "green", fontWeight: 500 }}>
                    {ConvertPriceString(record.salePrice)}
                    <span>(đ)</span>
                </span>
            ),
            sorter: (a, b) => a.salePrice - b.salePrice,
            width: "15%",
        },
        {
            title: "Tuỳ chọn",
            key: "option",
            render: (_, record) => (
                <Space size="middle">
                    <Link
                        className="update-book-btn text-blue-600"
                        to={`/admin/course/update/${record.id}`}
                        state={record}>
                        <Button icon={<EditOutlined />} />
                    </Link>
                    <Popconfirm
                        title="Xoá khoá học này"
                        description="Bạn có chắc là muốn xoá khoá học này?"
                        onConfirm={handleDeleteCourse}
                        okText="Xác nhận"
                        cancelText="Huỷ">
                        <Button
                            className="text-red-600 border-red-600 hover:text-red-400"
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <ConfigProvider>
            <div className="flex flex-col w-full bg-white px-5 shadow-lg">
                <div className="bg-white flex py-5 justify-between items-center">
                    <h1 className="font-medium text-lg mb-3">
                        Quản lý khoá học
                    </h1>
                    <div className="flex justify-center items-center">
                        <Link
                            to={"/admin/course/create"}
                            className="flex justify-center items-center">
                            <Button type="primary">Thêm khoá học</Button>
                        </Link>
                    </div>
                </div>
                <div className="w-1/5">
                    <Input
                        onChange={(e) => {
                            const filteredData = allCourse.filter((entry) =>
                                entry.courseName
                                    .toLowerCase()
                                    .includes(e.target.value.toLowerCase())
                            );
                            setDataSource(filteredData);
                        }}
                        placeholder="Tìm kiếm khoá học"
                        suffix={<SearchOutlined />}
                    />
                </div>
                <Table
                    style={{ width: "100%", marginTop: 12 }}
                    columns={columns}
                    dataSource={dataSource != null ? dataSource : allCourse}
                    scroll={{
                        y: 440,
                    }}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                setRowSelected(record);
                            },
                        };
                    }}
                />
            </div>
        </ConfigProvider>
    );
}

export default AdminCourse;
