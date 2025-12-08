import { useState } from "react";
import { Input, Col, Row, Select, DatePicker } from "antd";
import { Phone, EnvelopeSimple, MapPin, CalendarBlank } from "@phosphor-icons/react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
};

interface FormProps {
    onFormChange: (isValid: boolean) => void;
    onAccountTypeChange: (type: string) => void;
}

const FormCAEA: React.FC<FormProps> = ({ onFormChange, onAccountTypeChange }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        birthDate: null,
        phone: "",
        email: "",
        address: "",
        accountType: "Loại tài khoản",
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => {
            const updatedForm = { ...prev, [field]: value };

            if (field === "accountType") {
                onAccountTypeChange(value);
            }

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


    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        handleInputChange("phone", value);
    };

    dayjs.extend(customParseFormat);

    return (
        <div className="Form-acc">
            <div style={{ marginBottom: '10px' }}>
                <div style={{ marginBottom: '3px' }}>
                    <span>Họ và tên</span>
                </div>
                <div>
                    <Input
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Nhập tên của bạn"
                        className="custom-input"
                    />
                </div>
            </div>
            <Row style={{ justifyContent: 'space-between', marginBottom: '10px' }}>
                <Col style={{ width: '49%' }}>
                    <div>
                        <div style={{ marginBottom: '3px' }}>
                            <span>Ngày sinh</span>
                        </div>
                        <div>
                            <DatePicker
                                prefix={<CalendarBlank size={20} style={{ color: 'rgba(102, 112, 133, 1)' }} />}
                                style={{ width: "100%" }}
                                format={"DD/MM/YYYY"}
                                suffixIcon={null}
                                placeholder="DD/MM/YYYY"
                                className="custom-input"
                                value={formData.birthDate ? dayjs(formData.birthDate, "DD/MM/YYYY") : null}
                                onChange={(date) => handleInputChange("birthDate", date ? date.format("DD/MM/YYYY") : null)}
                            />
                        </div>
                    </div>
                </Col>
                <Col style={{ width: '49%' }}>
                    <div>
                        <div style={{ marginBottom: '3px' }}>
                            <span>Số điện thoại</span>
                        </div>
                        <div>
                            <Input
                                placeholder="Số điện thoại"
                                className="custom-input"
                                prefix={
                                    <Phone
                                        size={20}
                                        style={{ color: 'rgba(102, 112, 133, 1)' }}
                                    />
                                }
                                value={formData.phone}
                                onChange={handlePhoneChange} // Chỉ cho phép nhập số
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row style={{ justifyContent: 'space-between', marginBottom: '10px' }}>
                <Col style={{ width: '49%' }}>
                    <div>
                        <div style={{ marginBottom: '3px' }}>
                            <span>Email</span>
                        </div>
                        <div>
                            <Input
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)} // Kiểm tra email mỗi lần thay đổi
                                prefix={
                                    <EnvelopeSimple
                                        size={20}
                                        style={{ color: 'rgba(102, 112, 133, 1)' }}
                                    />
                                }
                                placeholder="Nhập email của bạn"
                                className="custom-input"
                            />
                        </div>
                    </div>
                </Col>
                <Col style={{ width: '49%' }}>
                    <div>
                        <div style={{ marginBottom: '3px' }}>
                            <span>Quê quán</span>
                        </div>
                        <div>
                            <Input
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                                prefix={
                                    <MapPin
                                        size={20}
                                        style={{ color: 'rgba(102, 112, 133, 1)' }}
                                    />
                                }
                                placeholder="Nhập quê quán"
                                className="custom-input"
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            <div style={{ marginBottom: '10px' }}>
                <div style={{ marginBottom: '3px' }}>
                    <span>Loại tài khoản</span>
                </div>
                <div>
                    <Select
                        value={formData.accountType}
                        onChange={(value) => handleInputChange("accountType", value)}
                        defaultValue="Loại tài khoản"
                        style={{ width: "49%" }}
                        options={[
                            { value: 'Sinh viên', label: 'Sinh viên' },
                            { value: 'Giảng viên', label: 'Giảng viên' },
                            { value: 'Nhân viên dịch vụ', label: 'Nhân viên dịch vụ' },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

export default FormCAEA;
