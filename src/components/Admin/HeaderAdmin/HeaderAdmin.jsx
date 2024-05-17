import { Header } from "antd/es/layout/layout";

import { LogoutOutlined } from "@ant-design/icons";
function HeaderAdmin() {
    return (
        <Header className="flex justify-between items-center  h-12">
            <div className="text-white font-medium text-xl">Admin panel</div>
            <div className="">
                <button className="flex justify-center items-center gap-2 px-2 py-1 text-white hover:cursor-pointer hover:bg-red-500  rounded">
                    <LogoutOutlined className="text-lg" />
                    <span className="text-base font-medium">Đăng xuất</span>
                </button>
            </div>
        </Header>
    );
}

export default HeaderAdmin;
