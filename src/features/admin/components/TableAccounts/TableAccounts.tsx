import "./index.scss";
import { FunnelSimple } from "@phosphor-icons/react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import TableListAcc from "./TableListAcc";
import { data } from "./TableListAcc";

function TableAccounts() {

    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);


    const typeCounts = data.reduce((acc, record) => {
        acc[record.type] = (acc[record.type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);


    const totalAccounts = data.length;


    const filteredData = selectedFilter ? data.filter(item => item.type === selectedFilter) : data;

    return (
        <div className="table-Accounts">

            <div className="filter-accounts">
                <div
                    className={`buttonFilter ${selectedFilter === null ? "active" : ""}`}
                    onClick={() => setSelectedFilter(null)}
                >
                    <span className={selectedFilter === null ? "selected-text" : "unselected-text"}>Tất cả</span>
                    &nbsp;&nbsp;
                    <span className={selectedFilter === null ? "selected-text1" : "unselected-text1"}>{totalAccounts}</span>
                </div>
                <div
                    className={`buttonFilter ${selectedFilter === "Sinh viên" ? "active" : ""}`}
                    onClick={() => setSelectedFilter("Sinh viên")}
                >
                    <span className={selectedFilter === "Sinh viên" ? "selected-text" : "unselected-text"}>Sinh viên</span>
                    &nbsp;&nbsp;
                    <span className={selectedFilter === "Sinh viên" ? "selected-text1" : "unselected-text1"}>{typeCounts["Sinh viên"] || 0}</span>
                </div>
                <div
                    className={`buttonFilter ${selectedFilter === "Nhà trường" ? "active" : ""}`}
                    onClick={() => setSelectedFilter("Nhà trường")}
                >
                    <span className={selectedFilter === "Nhà trường" ? "selected-text" : "unselected-text"}>Nhà trường</span>
                    &nbsp;&nbsp;
                    <span className={selectedFilter === "Nhà trường" ? "selected-text1" : "unselected-text1"}>{typeCounts["Nhà trường"] || 0}</span>
                </div>
                <div
                    className={`buttonFilter ${selectedFilter === "Giảng viên" ? "active" : ""}`}
                    onClick={() => setSelectedFilter("Giảng viên")}
                >
                    <span className={selectedFilter === "Giảng viên" ? "selected-text" : "unselected-text"}>Giảng viên</span>
                    &nbsp;&nbsp;
                    <span className={selectedFilter === "Giảng viên" ? "selected-text1" : "unselected-text1"}>{typeCounts["Giảng viên"] || 0}</span>
                </div>
                <div
                    className={`buttonFilter ${selectedFilter === "Nhân viên dịch vụ" ? "active" : ""}`}
                    onClick={() => setSelectedFilter("Nhân viên dịch vụ")}
                >
                    <span className={selectedFilter === "Nhân viên dịch vụ" ? "selected-text" : "unselected-text"}>Nhân viên dịch vụ</span>
                    &nbsp;&nbsp;
                    <span className={selectedFilter === "Nhân viên dịch vụ" ? "selected-text1" : "unselected-text1"}>{typeCounts["Nhân viên dịch vụ"] || 0}</span>
                </div>
            </div>


            <div className="filterAndSearch">
                <div className="flex filter">
                    <FunnelSimple size={24} />
                    <span>Bộ lọc</span>
                </div>
                <div className="SearchAcc">
                    <Input
                        placeholder="Tìm kiếm"
                        prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
                        allowClear
                        className="no-outline"
                    />
                </div>
            </div>

            <TableListAcc filteredData={filteredData} />
        </div>
    );
}

export default TableAccounts;
