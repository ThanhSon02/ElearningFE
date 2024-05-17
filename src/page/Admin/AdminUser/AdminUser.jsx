import { Button, ConfigProvider, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DeleteOutlined,
    SearchOutlined,
    PlusOutlined,
} from "@ant-design/icons";
function AdminUser() {
    const renderAction = () => (
        <Space size="middle">
            <a style={{ color: "red" }} onClick={showModalDelete}>
                <DeleteOutlined />
            </a>
        </Space>
    );
    const columns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Địa chỉ",
            key: "address",
            dataIndex: "address",
        },
        {
            title: "Loại tài khoản",
            dataIndex: "isAdmin",
            render: (_, { isAdmin }) => {
                if (isAdmin) {
                    return (
                        <span style={{ color: "green", fontWeight: 500 }}>
                            True
                        </span>
                    );
                } else {
                    return (
                        <span style={{ color: "red", fontWeight: 500 }}>
                            False
                        </span>
                    );
                }
            },
        },
        {
            title: "Tuỳ chọn",
            key: "option",
            render: renderAction,
        },
    ];

    const dispatch = useDispatch();
    // const userList = useSelector((state) => state.users.userList);
    // const currentUser = useSelector((state) => state.auth.auth);
    // const accessToken = currentUser.accessToken;
    const [rowSelected, setRowSelected] = useState("");
    const [openDelete, setOpenDelete] = useState(false);

    const showModalDelete = () => {
        setOpenDelete(true);
    };

    const hideModalDelete = () => {
        setOpenDelete(false);
    };

    useEffect(() => {
        // dispatch(getAllUser({ accessToken }));
    }, []);

    const handleDeleteUser = () => {
        // dispatch(deleteUser({ userID: rowSelected, accessToken }));
        hideModalDelete();
    };

    return (
        <ConfigProvider>
            <div className="flex flex-col w-full bg-white px-5">
                <div className="bg-white flex py-5 justify-between items-center">
                    <Input
                        className="w-[230px]"
                        prefix={
                            <SearchOutlined className="site-form-item-icon" />
                        }
                        placeholder="Tìm kiếm người dùng"
                    />
                </div>
                <Table
                    style={{ width: "100%" }}
                    columns={columns}
                    // dataSource={userList}
                    title={() => <h3>Tất cả người dùng</h3>}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                setRowSelected(record._id);
                            },
                        };
                    }}
                />
                <Modal
                    okText="Xoá"
                    cancelText="Huỷ"
                    open={openDelete}
                    onOk={handleDeleteUser}
                    onCancel={hideModalDelete}>
                    <h3>Bạn có chắc muốn xoá tài khoản này?</h3>
                </Modal>
            </div>
        </ConfigProvider>
    );
}

export default AdminUser;
