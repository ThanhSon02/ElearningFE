import { Button, ConfigProvider, Form, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../redux/Slice/categorySlice";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
function AdminCategory() {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth?.data?.token);
    const handleAddCategory = (categoryInfo) => {
        dispatch(addCategory({ categoryInfo, accessToken }));
    };

    const columns = [
        {
            title: "Tên danh mục",
            key: "categoryName",
            dataIndex: "categoryName",
        },
        {
            title: "Số khoá học",
            key: "courseNum",
            dataIndex: "courseNum",
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

    return (
        <ConfigProvider>
            <div className="bg-white w-full h-full flex flex-col">
                <Form
                    size="large"
                    onFinish={handleAddCategory}
                    className="bg-white  items-center flex gap-3 py-10 px-4 w-[800px]">
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Tên danh mục không được để trống!",
                            },
                        ]}
                        name="categoryName"
                        label="Tên danh mục"
                        className="font-medium">
                        <Input placeholder="" />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">Thêm</Button>
                    </Form.Item>
                </Form>
                <div className="w-2/3">
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
                </div>
            </div>
        </ConfigProvider>
    );
}

export default AdminCategory;
