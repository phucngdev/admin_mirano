import React, { useState } from 'react';
import { Table, Button, TableColumnsType } from 'antd';
import { Trash, PencilSimple } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import Avat from '#/assets/images/2-2190.jpg';


interface DataType {
    key: React.Key;
    name: string;
    acccode: string;
    email: string;
    date: string;
    phone: string;
    location: string;
    type: string;
}

const columns = (handleEdit: (acccode: string) => void): TableColumnsType<DataType> => [
    {
        title: 'Mã tài khoản',
        dataIndex: 'acccode',
        width: 110,
        render: text => (
            <span
                style={{
                    color: 'rgba(16, 24, 40, 1)',
                    fontWeight: '500',
                    fontSize: '14px',
                }}
            >
                {text}
            </span>
        ),
        onHeaderCell: () => ({
            style: {
                fontSize: '12px',
                color: 'rgba(102, 112, 133, 1)',
                fontWeight: '500',
            },
        }),
    },
    {
        title: 'Họ và tên',
        dataIndex: 'name',
        width: 130,
        render: text => (
            <span
                style={{
                    color: 'rgba(16, 24, 40, 1)',
                    fontWeight: '500',
                    fontSize: '14px',
                }}
            >
                {text}
            </span>
        ),
        onHeaderCell: () => ({
            style: {
                fontSize: '12px',
                color: 'rgba(102, 112, 133, 1)',
                fontWeight: '500',
            },
        }),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        width: 220,
        render: text => (
            <span
                style={{
                    color: 'rgba(102, 112, 133, 1)',
                    fontWeight: '400',
                    fontSize: '14px',
                }}
            >
                {text}
            </span>
        ),
        onHeaderCell: () => ({
            style: {
                fontSize: '12px',
                color: 'rgba(102, 112, 133, 1)',
                fontWeight: '500',
            },
        }),
    },
    {
        title: 'Năm sinh',
        dataIndex: 'date',
        width: 110,
        render: text => (
            <span
                style={{
                    color: 'rgba(102, 112, 133, 1)',
                    fontWeight: '400',
                    fontSize: '14px',
                }}
            >
                {text}
            </span>
        ),
        onHeaderCell: () => ({
            style: {
                fontSize: '12px',
                color: 'rgba(102, 112, 133, 1)',
                fontWeight: '500',
            },
        }),
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        width: 110,
        render: text => (
            <span
                style={{
                    color: 'rgba(102, 112, 133, 1)',
                    fontWeight: '400',
                    fontSize: '14px',
                }}
            >
                {text}
            </span>
        ),
        onHeaderCell: () => ({
            style: {
                fontSize: '12px',
                color: 'rgba(102, 112, 133, 1)',
                fontWeight: '500',
            },
        }),
    },
    {
        title: 'Quê quán',
        dataIndex: 'location',
        width: 110,
        render: text => (
            <span
                style={{
                    color: 'rgba(102, 112, 133, 1)',
                    fontWeight: '400',
                    fontSize: '14px',
                }}
            >
                {text}
            </span>
        ),
        onHeaderCell: () => ({
            style: {
                fontSize: '12px',
                color: 'rgba(102, 112, 133, 1)',
                fontWeight: '500',
            },
        }),
    },
    {
        title: 'Loại',
        dataIndex: 'type',
        width: 110,
        render: text => {
            let color = '';
            let backgroundColor = '';

            if (text === 'Sinh viên' || text === "Nhân viên dịch vụ") {
                color = 'rgba(2, 122, 72, 1)';
                backgroundColor = 'rgba(236, 253, 243, 1)';
            } else if (text === 'Nhà trường') {
                color = 'rgba(181, 71, 8, 1)';
                backgroundColor = 'rgba(255, 250, 235, 1)';
            } else if (text === 'Giảng viên') {
                color = 'rgba(193, 21, 116, 1)';
                backgroundColor = 'rgba(253, 242, 250, 1)';
            }

            return (
                <span
                    style={{
                        color,
                        backgroundColor,
                        fontWeight: '500',
                        fontSize: '12px',
                        padding: '2px 8px',
                        borderRadius: '16px',
                        textAlign: 'center',
                    }}
                >
                    {text}
                </span>
            );
        },
        onHeaderCell: () => ({
            style: {
                fontSize: '12px',
                color: 'rgba(102, 112, 133, 1)',
                fontWeight: '500',
            },
        }),
    },
    {
        width: 108,
        render: (_, record) => (
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Trash size={20} cursor="pointer" />
                <PencilSimple
                    size={20}
                    cursor="pointer"
                    onClick={() => handleEdit(record.acccode)}
                />            </div>
        ),
        onHeaderCell: () => ({
            style: {
                fontSize: '12px',
                color: 'rgba(102, 112, 133, 1)',
                fontWeight: '500',
            },
        }),
    },
];

export const data: DataType[] = Array.from({ length: 152 }, (_, i) => ({
    key: i + 1,
    name: `Người dùng ${i + 1}`,
    acccode: `TK00${i + 1}`,
    email: `user${i + 1}@gmail.com`,
    date: `19/05/199${i % 10}`,
    phone: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
    location: ["Hà Nội", "TP.HCM", "Đà Nẵng", "Hải Phòng"][i % 4],
    type: ["Sinh viên", "Giảng viên", "Nhà trường", "Nhân viên dịch vụ"][i % 4],
    img: { Avat }
}));

const TableListAcc: React.FC<{ filteredData: DataType[] }> = ({ filteredData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const fixedData = [...filteredData.slice(0, 8)];

    const navigate = useNavigate();

    const handleEdit = (acccode: string) => {
        navigate(`/accounts/list-accounts/detail-account/${acccode}`);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div style={{ marginTop: "30px", border: "1px solid rgba(228, 231, 236, 1", borderRadius: "8px", boxShadow: "0px 4px 8px -2px rgba(16, 24, 40, 0.1)" }}>
            <div style={{ overflowX: 'auto' }}>
                <Table<DataType>
                    columns={columns(handleEdit)}
                    dataSource={fixedData}
                    pagination={false}
                    rowSelection={{ type: 'checkbox' }}
                    scroll={{ x: 'max-content' }}
                />
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                }}
            >
                <Button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                >
                    {'<'} Trang trước
                </Button>

                <span style={{ fontWeight: '400', color: "rgba(52, 64, 84, 1)", fontSize: "14px" }}>
                    Trang {currentPage} trong {totalPages}
                </span>

                <Button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
                >
                    Trang sau {'>'}
                </Button>
            </div>
        </div>
    );
};

export default TableListAcc;
