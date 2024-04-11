import { Layout } from "antd";
import HeaderCustom from "../../Header/Header";
import FooterCustom from "../../Footer/Footer";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <HeaderCustom />
            <Content
                style={{
                    paddingLeft: 50,
                    paddingRight: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                }}>
                <Outlet />
            </Content>
            <FooterCustom />
        </Layout>
    );
}

export default DefaultLayout;
