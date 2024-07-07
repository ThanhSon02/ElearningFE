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
import CreateLectureModal from "../../../components/Admin/AdminModal/LectureModal/CreateLectureModal";
import UpdateLectureModal from "../../../components/Admin/AdminModal/LectureModal/UpdateLectureModal";
import { useDispatch, useSelector } from "react-redux";
import ConvertSecondToHms from "../../../utils/ConvertSecondToHms";
import { deleteLecture, getAllLecture } from "../../../redux/Slice/adminSlice";
import { useNavigate } from "react-router-dom";

function AdminLecture() {
    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [dataSource, setDataSource] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(
        (state) => state.admin?.data?.loginData?.token
    );
    useEffect(() => {
        dispatch(getAllLecture({ navigate, accessToken }));
    }, []);

    const allLecture = useSelector((state) => state?.admin?.data?.lectureData);

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 100,
            render: (_, record, index) => <span>{++index}</span>,
        },
        {
            title: "Tên bài giảng",
            key: "lectureName",
            dataIndex: "lectureName",
        },
        {
            title: "Học phần",
            key: "sectionName",
            dataIndex: "sectionName",
        },
        {
            title: "Thời lượng",
            key: "videoDuration",
            dataIndex: "videoDuration",
            render: (_, record) => (
                <span>{ConvertSecondToHms(record?.videoDuration)}</span>
            ),
        },
        {
            title: "Tuỳ chọn",
            key: "option",
            render: () => (
                <Space size="middle">
                    <Button
                        onClick={() => setUpdateModal(true)}
                        icon={<EditOutlined />}></Button>
                    <Popconfirm
                        title="Xoá khoá học này"
                        description="Bạn có chắc là muốn xoá khoá học này?"
                        onConfirm={() =>
                            dispatch(
                                deleteLecture({
                                    lectureId: rowSelected.id,
                                    navigate,
                                    accessToken,
                                })
                            )
                        }
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

    const [rowSelected, setRowSelected] = useState("");
    return (
        <ConfigProvider>
            <div className="flex flex-col w-full bg-white px-5 shadow-lg">
                <div className="bg-white flex py-5 justify-between items-center">
                    <h1 className="font-medium text-lg mb-3">
                        Quản lý bài giảng
                    </h1>
                    <div className="flex justify-center items-center">
                        <Button
                            type="primary"
                            onClick={() => setCreateModal(true)}>
                            Thêm bài giảng
                        </Button>
                    </div>
                </div>
                <div className="w-1/5">
                    <Input
                        onChange={(e) => {
                            const filteredData = allLecture.filter((entry) =>
                                entry.lectureName
                                    .toLowerCase()
                                    .includes(e.target.value.toLowerCase())
                            );
                            setDataSource(filteredData);
                        }}
                        placeholder="Tìm kiếm bài giảng"
                        suffix={<SearchOutlined />}
                    />
                </div>
                <Table
                    style={{ width: "100%" }}
                    columns={columns}
                    dataSource={dataSource != null ? dataSource : allLecture}
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
                    footer={[]}
                    onCancel={() => setCreateModal(false)}>
                    <CreateLectureModal
                        data={rowSelected}
                        close={() => setCreateModal(false)}
                    />
                </Modal>
                <Modal
                    okText="Xác nhận"
                    cancelText="Huỷ"
                    open={updateModal}
                    footer={[]}
                    onCancel={() => setUpdateModal(false)}>
                    <UpdateLectureModal
                        data={rowSelected}
                        close={() => setUpdateModal(false)}
                    />
                </Modal>
            </div>
        </ConfigProvider>
    );
}

export default AdminLecture;
