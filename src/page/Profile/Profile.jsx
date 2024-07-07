import { Tabs, Breadcrumb } from "antd";
import ProfileContent from "../../components/ProfileContent/ProfileContent";

function Profile() {
    const items = [
        {
            key: "1",
            label: (
                <span className="text-base font-semibold ">
                    Thông tin cá nhân
                </span>
            ),
            children: <ProfileContent />,
        },
    ];

    return (
        <div className="w-full">
            <Breadcrumb className="my-3">
                <Breadcrumb.Item href="/" className="text-base text-black">
                    Trang chủ
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/my_course">
                    Trang cá nhân
                </Breadcrumb.Item>
            </Breadcrumb>
            <ProfileContent />
        </div>
    );
}

export default Profile;
