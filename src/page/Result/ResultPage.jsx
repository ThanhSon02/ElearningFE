import { Button, Result } from "antd";

function ResultPage() {
    return (
        <Result
            status="success"
            title="Thanh toán thành công!"
            extra={[
                <Button type="primary" key="console">
                    Quay lại trang chủ
                </Button>,
            ]}
        />
    );
}

export default ResultPage;
