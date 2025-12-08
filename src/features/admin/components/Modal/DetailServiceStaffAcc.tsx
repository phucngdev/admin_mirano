import { useState } from "react";
import { Input, Select } from "antd";
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
        accountType: "Chọn trung tâm",
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
                    <span>Trung tâm</span>
                </div>
                <div>
                    <Select
                        value={formData.accountType}
                        onChange={(value) => handleInputChange("accountType", value)}
                        defaultValue="Chọn trung tâm"
                        style={{ width: "100%" }}
                        options={[
                            { value: 'sv', label: 'sv' },
                            { value: 'gv', label: 'gv' },
                            { value: 'nt', label: 'nt' },
                        ]}
                    />
                </div>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <div style={{ marginBottom: '3px' }}>
                    <span>Chức vụ</span>
                </div>
                <div>
                    <Input
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Nhập Chức vụ"
                        className="custom-input"
                    />
                </div>
            </div>

        </div>
    );
}

export default DetailSchoolAcc;
