import {
    Button,
    ConfigProvider,
    Form,
    Modal,
    Popconfirm,
    Space,
    Table,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { deleteCategory } from "../../../redux/Slice/adminSlice";
import { useNavigate } from "react-router-dom";
import UpdateCategoryModal from "../../../components/Admin/AdminModal/CategoryModal/UpdateCategoryModal";
import CreateCategoryModal from "../../../components/Admin/AdminModal/CategoryModal/CreateCategoryModal";
function AdminCategory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(
        (state) => state.admin?.data?.loginData?.token
    );
    const allCategory = useSelector((state) =>
        state?.admin?.data?.categoryData != null
            ? state?.admin?.data?.categoryData
            : []
    );

    const [rowSelected, setRowSelected] = useState("");
    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 100,
            render: (_, record, index) => <span>{++index}</span>,
        },
        {
            title: "Tên danh mục",
            key: "categoryName",
            dataIndex: "categoryName",
            width: 400,
            sorter: (a, b) => a.categoryName.length - b.categoryName.length,
        },
        {
            title: "Tuỳ chọn",
            key: "option",
            width: 200,
            render: () => (
                <Space size="middle">
                    <Button
                        onClick={() => setUpdateModal(true)}
                        icon={<EditOutlined />}
                    />
                    <Popconfirm
                        title="Xoá khoá học này"
                        description="Bạn có chắc là muốn xoá khoá học này?"
                        onConfirm={handleDeleteCategory}
                        okText="Xác nhận"
                        cancelText="Huỷ">
                        <Button
                            className="text-red-600 border-red-600 "
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleDeleteCategory = () => {
        dispatch(
            deleteCategory({
                categoryId: rowSelected.id,
                navigate,
                accessToken,
            })
        );
    };

    const [formUpdate] = Form.useForm();

    return (
        <ConfigProvider>
            <div className="bg-white w-full h-full flex flex-col px-5 shadow-lg">
                <div className="bg-white flex py-5 justify-between items-center">
                    <h1 className="font-medium text-lg mb-3">
                        Quản lý danh mục
                    </h1>
                    <div className="flex justify-center items-center">
                        <Button
                            type="primary"
                            onClick={() => setCreateModal(true)}
                            className="flex justify-center items-center">
                            Thêm danh mục
                        </Button>
                    </div>
                </div>
                <div className="w-full">
                    <Table
                        columns={columns}
                        dataSource={allCategory}
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
                    <Modal
                        okText="Xác nhận"
                        cancelText="Huỷ"
                        open={createModal}
                        onOk={() => formUpdate.submit()}
                        footer={[]}
                        onCancel={() => setCreateModal(false)}>
                        <CreateCategoryModal
                            close={() => setCreateModal(false)}
                        />
                    </Modal>
                    <Modal
                        okText="Xác nhận"
                        cancelText="Huỷ"
                        open={updateModal}
                        footer={[]}
                        onOk={() => formUpdate.submit()}
                        onCancel={() => setUpdateModal(false)}>
                        <UpdateCategoryModal
                            data={rowSelected}
                            close={() => setUpdateModal(false)}
                        />
                    </Modal>
                </div>
            </div>
        </ConfigProvider>
    );
}

export default AdminCategory;
