import { Tabs, Breadcrumb } from "antd";
import ProfileContent from "../../components/ProfileContent/ProfileContent";
import { useSelector } from "react-redux";
import { useState } from "react";

function Profile() {
    const userInfo = useSelector((state) => state.auth?.data?.user);

    const items = [
        {
            key: "1",
            label: (
                <span className="text-base font-semibold ">
                    Thông tin cá nhân
                </span>
            ),
            children: <ProfileContent userInfo={userInfo} />,
        },
    ];

    return (
        <div className="w-full">
            <Breadcrumb className="mt-3">
                <Breadcrumb.Item href="/" className="text-base text-black">
                    Trang chủ
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/my_course">
                    Trang cá nhân
                </Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="font-semibold text-3xl my-3">Trang cá nhân</h1>
            <Tabs className="w-full" size="large" items={items} />
        </div>
    );
}

export default Profile;
