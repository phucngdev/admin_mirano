import { useState } from 'react';
import BreadsCrumbs from '../../../../shared/components/BreadsCrumbs/BreadsCrumbs'
import UploadFile from '../../../../shared/components/BreadsCrumbs//UploadFile'
import { Button } from 'antd';
import "./index.scss"
import TableAccounts from '../../components/TableAccounts/TableAccounts';
import ModalCreateUpdateUser from '../../components/Modal/ModalCreateUpdateUser';

function ListAccounts() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div className='Container-t-listAndTable'>
            <BreadsCrumbs />
            <div className="listAccountsIpfileAndCreatAcc">
                <div className="listAccounts-t">
                    <span>Danh sách tài khoản</span>
                </div>
                <div className="updateFileAndCreateAcc">
                    <UploadFile />
                    <Button type="primary" onClick={showModal} style={{ marginLeft: "5px", backgroundColor: "rgba(181, 65, 21, 1)", padding: "10px 16px" }}>
                        + Thêm tài khoản
                    </Button>
                </div>
            </div>
            <div className="tableAccounts-t">
                <TableAccounts />
            </div>
            <ModalCreateUpdateUser open={isModalOpen} onClose={closeModal} />
        </div>
    )
}

export default ListAccounts
