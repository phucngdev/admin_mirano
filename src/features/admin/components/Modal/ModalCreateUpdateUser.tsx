import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import './index.scss';
import UploadImage from './UploadImage';
import FormCAEA from './FormCAEA';
import DetailAcc from './DetailAcc';
import DetailSchoolAcc from './DetailSchoolAcc';
import DetailServiceStaffAcc from './DetailServiceStaffAcc';


interface ModalProps {
    open: boolean;
    onClose: () => void;
}

const ModalCreateUpdateUser: React.FC<ModalProps> = ({ open, onClose }) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [selectedAccountType, setSelectedAccountType] = useState<string | null>(null);

    return (
        <Modal
            open={open}
            onCancel={onClose}
            width={1078}
            closeIcon={<CloseOutlined style={{ fontSize: '18px' }} />}
            title={
                <div>
                    <span
                        style={{
                            color: 'rgba(16, 24, 40, 1)',
                            fontSize: '30px',
                            fontWeight: '500',
                        }}
                    >
                        Thêm tài khoản mới
                    </span>
                </div>
            }
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    style={{
                        backgroundColor: isFormValid
                            ? 'rgba(181, 65, 21, 1) '
                            : 'rgba(255, 177, 148, 1)',
                        color: '#fff',
                        fontSize: '14px',
                        border: 'none',
                        cursor: isFormValid ? 'pointer' : 'not-allowed',
                    }}
                    disabled={!isFormValid}
                >
                    Thêm tài khoản
                </Button>,
            ]}
        >
            <Row style={{ marginBottom: "10px", borderBottom: "1px solid rgba(228, 231, 236, 1)" }}>
                <Col span={8}>
                    <div className="information-modal">
                        <p>Thông tin chung</p>
                        <p>Cập nhật thông tin chung về tài khoản</p>
                    </div>
                </Col>
                <Col span={16}>
                    <div className="formCreateAcc">
                        <UploadImage />
                        <FormCAEA onFormChange={setIsFormValid} onAccountTypeChange={setSelectedAccountType} />
                    </div>
                </Col>
            </Row>
            {selectedAccountType === "Sinh viên" && (
                <Row style={{ paddingTop: "20px" }}>
                    <Col span={8}>
                        <div className="information-modal">
                            <p>Thông tin sinh viên</p>
                            <p>Cập nhật thông tin liên quan đến loại tài khoản</p>
                        </div>
                    </Col>
                    <Col span={16}>
                        <div className="formCreateAcc">
                            <DetailAcc onFormChange={setIsFormValid} />
                        </div>
                    </Col>
                </Row>
            )}

            {selectedAccountType === "Giảng viên" && (
                <Row style={{ paddingTop: "20px" }}>
                    <Col span={8}>
                        <div className="information-modal">
                            <p>Thông tin giảng viên</p>
                            <p>Cập nhật thông tin liên quan đến loại tài khoản</p>
                        </div>
                    </Col>
                    <Col span={16}>
                        <div className="formCreateAcc">
                            <DetailSchoolAcc onFormChange={setIsFormValid} />
                        </div>
                    </Col>
                </Row>
            )}

            {selectedAccountType === "Nhân viên dịch vụ" && (
                <Row style={{ paddingTop: "20px" }}>
                    <Col span={8}>
                        <div className="information-modal">
                            <p>Thông tin nhân viên dịch vụ</p>
                            <p>Cập nhật thông tin liên quan đến loại tài khoản</p>
                        </div>
                    </Col>
                    <Col span={16}>
                        <div className="formCreateAcc">
                            <DetailServiceStaffAcc onFormChange={setIsFormValid} />
                        </div>
                    </Col>
                </Row>
            )}
        </Modal>
    );
};

export default ModalCreateUpdateUser;
