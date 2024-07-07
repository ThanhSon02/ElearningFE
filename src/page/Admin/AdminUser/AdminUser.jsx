import { Button, ConfigProvider, Modal, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getAllUser } from "../../../redux/Slice/adminSlice";
import { useNavigate } from "react-router-dom";
function AdminUser() {
    const renderAction = () => (
        <Space size="middle">
            <Button onClick={showModalDelete} icon={<EditOutlined />} />

            <Button
                onClick={showModalDelete}
                className="text-red-600 border-red-600"
                icon={<DeleteOutlined />}
            />
        </Space>
    );
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_, record, index) => <span>{++index}</span>,
            width: "5%",
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            render: (text) => <span>{text}</span>,
            width: "25%",
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            width: "15%",
        },

        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "20%",
            sorter: (a, b) => a.email.length - b.email.length,
        },
        {
            title: "Loại tài khoản",
            dataIndex: "roles",
            render: (_, { roles }) => (
                <>
                    {roles.map((role, index) => (
                        <Tag key={index} color="green" className="font-medium">
                            {role.roleName.toUpperCase()}
                        </Tag>
                    ))}
                </>
            ),
            filters: [
                {
                    text: "ADMIN",
                    value: "ROLE_ADMIN",
                },
                {
                    text: "TEACHER",
                    value: "ROLE_TEACHER",
                },
                {
                    text: "STUDENT",
                    value: "ROLE_STUDENT",
                },
            ],
            onFilter: (value, record) => value === record.roles[0].roleName,
            width: "15%",
        },
        {
            title: "Tuỳ chọn",
            key: "option",
            render: renderAction,
        },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(
        (state) => state?.admin?.data?.loginData?.token
    );
    const allUser = useSelector(
        (state) => state?.admin?.data?.allUserData?.allUser
    );
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

    const handleDeleteUser = () => {
        // dispatch(deleteUser({ userID: rowSelected, accessToken }));
        hideModalDelete();
    };

    return (
        <ConfigProvider>
            <div className="flex flex-col w-full bg-white px-5 py-3 shadow-lg">
                <h1 className="font-medium text-lg mb-3">Quản lý người dùng</h1>

                <Table
                    style={{ width: "100%" }}
                    columns={columns}
                    dataSource={allUser}
                    // title={() => <h3>Tất cả người dùng</h3>}
                    bordered
                    scroll={{
                        y: 440,
                    }}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                setRowSelected(record.id);
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
