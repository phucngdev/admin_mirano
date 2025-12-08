import { useState } from "react";
import { Input, Col, Row, Select, } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
};

interface FormProps {
    onFormChange: (isValid: boolean) => void;
}

const DetailSchoolAcc: React.FC<FormProps> = ({ onFormChange }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        birthDate: null,
        phone: "",
        email: "",
        address: "",
        accountType: "Chọn trường",
        speciaLized: "Chọn chuyên ngành",
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => {
            const updatedForm = { ...prev, [field]: value };


            const isValid =
                updatedForm.fullName.trim() !== "" &&
                updatedForm.birthDate !== null &&
                updatedForm.phone.trim() !== "" &&
                updatedForm.email.trim() !== "" &&
                validateEmail(updatedForm.email) &&
                updatedForm.address.trim() !== "" &&
                updatedForm.accountType.trim() !== "";

            onFormChange(isValid);
            return updatedForm;
        });
    };




    dayjs.extend(customParseFormat);

    return (
        <div className="Form-acc">
            <div style={{ marginBottom: '10px' }}>
                <div style={{ marginBottom: '3px' }}>
                    <span>Trường</span>
                </div>
                <div>
                    <Select
                        value={formData.accountType}
                        onChange={(value) => handleInputChange("accountType", value)}
                        defaultValue="Trường"
                        style={{ width: "100%" }}
                        options={[
                            { value: 'sv', label: 'sv' },
                            { value: 'gv', label: 'gv' },
                            { value: 'nt', label: 'nt' },
                        ]}
                    />
                </div>
            </div>
            <Row style={{ justifyContent: 'space-between', marginBottom: '10px' }}>
                <Col style={{ width: '49%' }}>
                    <div>
                        <div style={{ marginBottom: '3px' }}>
                            <span>Mã giảng viên</span>
                        </div>
                        <div>
                            <Input
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder="Nhập mã giảng viên"
                                className="custom-input"
                            />
                        </div>
                    </div>
                </Col>
                <Col style={{ width: '49%' }}>
                    <div>
                        <div style={{ marginBottom: '3px' }}>
                            <span>Làm việc từ</span>
                        </div>
                        <div>
                            <Input
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                                placeholder="Thời gian làm việc"
                                className="custom-input"
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            <div style={{ marginBottom: '10px' }}>
                <div style={{ marginBottom: '3px' }}>
                    <span>Chuyên ngành</span>
                </div>
                <div>
                    <Select
                        value={formData.speciaLized}
                        onChange={(value) => handleInputChange("speciaLized", value)}
                        defaultValue="Chọn Chuyên ngành của bạn"
                        style={{ width: "100%" }}
                        options={[
                            { value: 'sv', label: 'sv' },
                            { value: 'gv', label: 'gv' },
                            { value: 'nt', label: 'nt' },
                        ]}
                    />
                </div>
            </div>

        </div>
    );
}

export default DetailSchoolAcc;
