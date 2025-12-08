import React, { useState } from "react";
import { Upload, Avatar, Col, Row, UploadFile } from "antd";
import { User, CloudArrowUp } from "@phosphor-icons/react";
import type { UploadProps, RcFile } from "antd/es/upload";

const UploadImage: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleChange: UploadProps["onChange"] = (info) => {
        const file = info.file as UploadFile<any>;
        const fileObj = file.originFileObj as RcFile;

        if (fileObj) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(fileObj);
        }
    };

    return (
        <Row align="middle">
            <Col span={4}>
                <Avatar
                    size={64}
                    icon={!imageUrl ? <User size={32} style={{ color: "rgba(181, 65, 21, 1)" }} /> : undefined}
                    src={imageUrl || undefined}
                    style={{
                        backgroundColor: !imageUrl ? "rgba(255, 241, 235, 1)" : "transparent",
                    }}
                />
            </Col>
            <Col span={20}>
                <Upload.Dragger
                    name="avatar"
                    showUploadList={false}
                    beforeUpload={(file) => {
                        const isAllowed = ["image/png", "image/jpeg", "image/gif", "image/svg+xml"].includes(file.type);
                        if (!isAllowed) {
                            alert("Chỉ chấp nhận PNG, JPG, GIF hoặc SVG.");
                            return false;
                        }
                        return true;
                    }}
                    customRequest={({ file, onSuccess, onError }) => {
                        const fileObj = file as RcFile;
                        const reader = new FileReader();

                        reader.onload = () => {
                            setImageUrl(reader.result as string);
                            onSuccess?.("ok");
                        };

                        reader.onerror = () => {
                            onError?.(new Error("Lỗi khi đọc file"));
                        };

                        reader.readAsDataURL(fileObj);
                    }}
                    onChange={handleChange}
                >
                    <p className="ant-upload-drag-icon">
                        <CloudArrowUp size={20} />
                    </p>
                    <p style={{ fontWeight: "500", fontSize: "14px", color: "rgba(147, 47, 8, 1)" }}>
                        Click để tải lên <span style={{ color: "rgba(102, 112, 133, 1)", fontSize: "14px" }}>hoặc kéo thả</span>
                    </p>
                    <p style={{ fontSize: "12px", color: "rgba(102, 112, 133, 1)" }}>
                        SVG, PNG, JPG hoặc GIF (tối đa 400x400px)
                    </p>
                </Upload.Dragger>
            </Col>
        </Row>
    );
};

export default UploadImage;
