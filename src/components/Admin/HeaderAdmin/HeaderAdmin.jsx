import { Header } from "antd/es/layout/layout";

import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logOutAdmin } from "../../../redux/Slice/adminSlice";
import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown } from "antd";

function HeaderAdmin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) =>
        state.auth.data?.user ? state.auth.data?.user : null
    );

    const handleLogout = () => {
        dispatch(logOutAdmin({ navigate }));
    };
    const items = [
        {
            key: "1",
            label: (
                <div
                    onClick={() => handleLogout(navigate)}
                    className="flex items-center gap-2 m-w-[140px]">
                    <LogoutOutlined className="text-red-600" />
                    <span className="text-red-600">Đăng xuất</span>
                </div>
            ),
        },
    ];
    return (
        <Header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 40,
                width: "100%",
                display: "flex",
                alignItems: "center",
            }}
            className="flex justify-end items-center h-12 bg-white shadow-md">
            <div className="flex items-center">
                <Dropdown
                    menu={{ items: items }}
                    placement="bottom"
                    className="cursor-pointer">
                    <Avatar
                        className="hover:bg-[#27272a1f] uppercase"
                        style={{
                            backgroundColor: "#fde3cf",
                            color: "red",
                        }}>
                        {userLogin?.name.split(" ").length > 1
                            ? userLogin?.name.split(" ")[0][0] +
                              userLogin?.name.split(" ")[1][0]
                            : userLogin?.name.split(" ")[0][0]}
                    </Avatar>
                </Dropdown>
            </div>
        </Header>
    );
}

export default HeaderAdmin;
