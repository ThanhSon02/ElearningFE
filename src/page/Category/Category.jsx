/* eslint-disable react/jsx-key */
import { Breadcrumb, Col, Pagination, Row } from "antd";
import Course from "../../components/Course/Course";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

function Category() {
    const location = useLocation();
    const state = location.state;
    const [data, setData] = useState([]);

    useEffect(() => {
        axiosInstance
            .get(`/public/api/course/getAllByCategory/${state}`)
            .then((result) => {
                setData(result.data?.data?.allCourseByCategory);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }, []);

    // Paginate
    const itemsPerPage = 8;
    const [pageCount, setPageCount] = useState(1);
    const maxIndex = pageCount * itemsPerPage;
    const minIndex = maxIndex - itemsPerPage;
    const total = data.length;
    const newList = data.slice(minIndex, maxIndex);

    const handlePagination = (page) => {
        setPageCount(page);
    };
    // paginate end

    return (
        <div className="w-full px-14 py-5">
            <Breadcrumb className="mb-2">
                <Breadcrumb.Item href="/" className="text-base text-black">
                    Trang chủ
                </Breadcrumb.Item>

                <Breadcrumb.Item className="text-base text-black">
                    Danh mục
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="bg-white px-6 py-3 rounded-md w-full flex flex-col">
                <Row justify={"start"} gutter={24}>
                    {newList.length > 0 ? (
                        newList.map((item, index) => (
                            <Col className="mb-8" span={6}>
                                <Course courseData={item} key={index} />
                            </Col>
                        ))
                    ) : (
                        <div>Không có sản phẩm nào trong danh mục</div>
                    )}
                </Row>

                {newList.length > 0 ? (
                    <Pagination
                        className="mt-3 text-end"
                        defaultCurrent={pageCount}
                        onChange={handlePagination}
                        total={total}
                    />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Category;
