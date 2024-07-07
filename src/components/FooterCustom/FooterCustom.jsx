import { Flex } from "antd";
import { Footer } from "antd/es/layout/layout";
import {
    TwitterOutlined,
    InstagramOutlined,
    FacebookOutlined,
    LinkedinOutlined,
    WhatsAppOutlined,
} from "@ant-design/icons";
function FooterCustom() {
    return (
        <Footer
            style={{
                zIndex: 10,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#212121",
                paddingTop: 20,
                paddingBottom: 30,
            }}>
            <Flex justify="space-between" className="w-full">
                <div>
                    <h3 className="font-bold text-sm uppercase text-[#ba955f]">
                        Về chúng tôi
                    </h3>
                    <div className="text-[#c2c2ca] mt-2 flex flex-col gap-1 cursor-pointer">
                        <p>Điều khoản</p>
                        <p>Chính sách bảo mật</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-sm uppercase text-[#ba955f]">
                        Cộng đồng
                    </h3>
                    <div className="text-[#c2c2ca] mt-2 flex flex-col gap-1 cursor-pointer">
                        <p>Chăm sóc khách hàng</p>
                        <p>Blog</p>
                        <p>Danh mục</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-sm uppercase text-[#ba955f]">
                        Địa chỉ
                    </h3>
                    <div className="text-[#c2c2ca] mt-2 flex flex-col gap-1 cursor-pointer">
                        <p>Công ty TNHH Công Nghệ Giáo Dục</p>
                        <p>MST: 324498543</p>
                        <p>Email: trogiup@edu.vn</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-sm uppercase text-[#ba955f]">
                        Mạng xã hội
                    </h3>
                    <div className="flex gap-2 mt-2">
                        <TwitterOutlined
                            style={{
                                color: "##c2c2ca",
                                fontSize: 18,
                                cursor: "pointer",
                            }}
                        />
                        <InstagramOutlined
                            style={{
                                color: "##c2c2ca",
                                fontSize: 18,
                                cursor: "pointer",
                            }}
                        />
                        <FacebookOutlined
                            style={{
                                color: "##c2c2ca",
                                fontSize: 18,
                                cursor: "pointer",
                            }}
                        />
                        <LinkedinOutlined
                            style={{
                                color: "##c2c2ca",
                                fontSize: 18,
                                cursor: "pointer",
                            }}
                        />
                        <WhatsAppOutlined
                            style={{
                                color: "##c2c2ca",
                                fontSize: 18,
                                cursor: "pointer",
                            }}
                        />
                    </div>
                </div>
            </Flex>
        </Footer>
    );
}

export default FooterCustom;
