import {
    Button,
    ConfigProvider,
    Input,
    Modal,
    Popconfirm,
    Space,
    Table,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import CreateSectionModal from "../../../components/Admin/AdminModal/SectionModal/CreateSectionModal";
import UpdateSectionModal from "../../../components/Admin/AdminModal/SectionModal/UpdateSectionModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSection, getAllSection } from "../../../redux/Slice/adminSlice";

function AdminSection() {
    const [rowSelected, setRowSelected] = useState("");
    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [dataSource, setDataSource] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(
        (state) => state.admin?.data?.loginData?.token
    );
    useEffect(() => {
        dispatch(getAllSection({ navigate, accessToken }));
    }, []);

    const allSection = useSelector((state) =>
        state?.admin?.data?.sectionData != null
            ? state?.admin?.data?.sectionData
            : []
    );

    const allCourse = useSelector((state) =>
        state.admin.data?.courseData != null ? state.admin.data?.courseData : []
    );

    const courseFilter = allCourse.map((course) => {
        const container = {};
        container.text = course?.courseName;
        container.value = course?.courseId;
        return container;
    });

    const courseOption = allCourse.map((course) => {
        const container = {};
        container.label = course?.courseName;
        container.value = course?.courseId;
        return container;
    });

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 100,
            render: (_, record, index) => <span>{++index}</span>,
        },
        {
            title: "Tên học phần",
            key: "sectionName",
            dataIndex: "sectionName",
            sorter: (a, b) => a.sectionName.length - b.sectionName.length,
        },
        {
            title: "Khoá học",
            key: "courseName",
            dataIndex: "courseName",
            filters: courseOption,
            onFilter: (value, record) => record?.courseName.startsWith(value),
            width: "50%",
        },
        {
            title: "Tuỳ chọn",
            key: "option",
            width: 300,
            render: () => (
                <Space size="middle">
                    <Button
                        className="text-blue-600"
                        icon={<EditOutlined />}
                        onClick={() => setUpdateModal(true)}></Button>
                    <Popconfirm
                        title="Xoá khoá học này"
                        onConfirm={() =>
                            dispatch(
                                deleteSection({
                                    sectionId: rowSelected.sectionId,
                                    navigate,
                                    accessToken,
                                })
                            )
                        }
                        description="Bạn có chắc là muốn xoá khoá học này?"
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
                        Quản lý học phần
                    </h1>
                    <div className="flex justify-center items-center">
                        <Button
                            type="primary"
                            className=" "
                            onClick={() => setCreateModal(true)}>
                            Thêm học phần
                        </Button>
                    </div>
                </div>
                <div className="w-1/5">
                    <Input
                        onChange={(e) => {
                            const filteredData = allSection.filter((entry) =>
                                entry.sectionName
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
                    style={{ width: "100%" }}
                    columns={columns}
                    dataSource={dataSource != null ? dataSource : allSection}
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
                    open={createModal}
                    footer={[]}
                    onCancel={() => setCreateModal(false)}>
                    <CreateSectionModal
                        data={rowSelected}
                        close={() => setCreateModal(false)}
                    />
                </Modal>
                <Modal
                    open={updateModal}
                    footer={[]}
                    onCancel={() => setUpdateModal(false)}>
                    <UpdateSectionModal
                        sectionData={rowSelected}
                        close={() => setUpdateModal(false)}
                    />
                </Modal>
            </div>
        </ConfigProvider>
    );
}

export default AdminSection;
