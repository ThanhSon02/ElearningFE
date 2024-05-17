import {
    Button,
    ConfigProvider,
    Drawer,
    Form,
    Input,
    Modal,
    Space,
    Table,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import AdminCourseModal from "../../../components/Admin/AdminModal/AdminCourseModal";
function AdminCourse() {
    const columns = [
        {
            title: "Tên khoá học",
            key: "course_name",
            dataIndex: "course_name",
        },
        {
            title: "Danh mục",
            key: "category",
            dataIndex: "category",
        },
        {
            title: "Ảnh",
            key: "course_img",
            dataIndex: "course_img",
            render: (_, record) => (
                <img width={32} height={48} src={record.course_img} />
            ),
        },
        {
            title: "Giá",
            key: "price",
            dataIndex: "price",
            render: (_, record) => (
                <span style={{ color: "green", fontWeight: 500 }}>
                    {record.price}
                    <span>đ</span>
                </span>
            ),
        },
        {
            title: "Giảm giá",
            key: "discount",
            dataIndex: "discount",
            render: (_, record) => (
                <span style={{ color: "green", fontWeight: 500 }}>
                    {record.discount}
                    <span>%</span>
                </span>
            ),
        },
        {
            title: "Số người đăng ký",
            dataIndex: "joined",
            key: "joined",
            render: (_, record) => (
                <span style={{ color: "crimson", fontWeight: 500 }}>
                    {record.joind}
                </span>
            ),
        },
        {
            title: "Tuỳ chọn",
            key: "option",
            render: () => (
                <Space size="middle">
                    <a className="update-book-btn" onClick={() => {}}>
                        <EditOutlined />
                    </a>
                    <a className="delete-book-btn" onClick={() => {}}>
                        <DeleteOutlined />
                    </a>
                </Space>
            ),
        },
    ];
    const dispatch = useDispatch();
    // const data = useSelector((state) => state.books.bookList);

    const [rowSelected, setRowSelected] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [insertDrawer, setInsertDrawer] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const [form] = Form.useForm();

    const openInsertDrawer = () => {
        setInsertDrawer(true);
    };

    const hideInsertDrawer = () => {
        setInsertDrawer(false);
    };

    const createFormRef = useRef();
    const updateFormRef = useRef();

    return (
        <ConfigProvider>
            <div className="flex flex-col w-full bg-white px-5">
                <div className="bg-white flex py-5 justify-between items-center">
                    <Input
                        className="w-[230px]"
                        prefix={
                            <SearchOutlined className="site-form-item-icon" />
                        }
                        placeholder="Tìm kiếm khoá học"
                    />
                    <div className="flex justify-center items-center">
                        <Button
                            onClick={openInsertDrawer}
                            className="flex justify-center items-center">
                            <PlusOutlined />
                        </Button>
                    </div>
                </div>
                <Table
                    style={{ width: "100%" }}
                    columns={columns}
                    // dataSource={}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                setRowSelected(record);
                            },
                        };
                    }}
                />
                <Modal
                    okText="Xoá"
                    cancelText="Huỷ"
                    open={openDelete}
                    onOk={() => {}}
                    onCancel={() => {}}>
                    <h3>Bạn có chắc muốn xoá sản phẩm này?</h3>
                </Modal>
                <Drawer
                    width={900}
                    title="Thêm khoá học"
                    open={insertDrawer}
                    onClose={hideInsertDrawer}
                    extra={
                        <Space>
                            <Button onClick={hideInsertDrawer}>Cancel</Button>
                            <Button onClick={form.submit} type="primary">
                                Submit
                            </Button>
                        </Space>
                    }>
                    <AdminCourseModal form={form} formRef={createFormRef} />
                </Drawer>
                <Modal
                    title="Chỉnh sửa sản phẩm"
                    open={openUpdate}
                    onCancel={() => {}}
                    footer={[
                        <Button key={"cancel"} onClick={() => {}}>
                            Huỷ
                        </Button>,
                        <Button
                            key={"update"}
                            type="primary"
                            onClick={() => {}}>
                            Cập nhật
                        </Button>,
                    ]}>
                    {/* <AdminUpdateBookModal
                        form={form}
                        formRef={updateFormRef}
                        currentData={rowSelected}
                    /> */}
                </Modal>
            </div>
        </ConfigProvider>
    );
}

export default AdminCourse;
