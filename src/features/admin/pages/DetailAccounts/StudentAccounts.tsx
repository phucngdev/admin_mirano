// import React from 'react'
import BreadsCrumbs from '../../../../shared/components/BreadsCrumbs/BreadsCrumbs'
import { Button, Avatar } from 'antd';
import "./index.scss"
import { Pen } from "@phosphor-icons/react";
import avt from "#/assets/images/Avatar.png"
import FilterDetailAcc from '#/shared/components/FilterDetailAcc/FilterDetailAcc';



function StudentAccounts() {
    return (
        <div className='Container-t-detailAcc'>
            <BreadsCrumbs />
            <div className="listAccountsIpfileAndCreatAcc">
                <div className='flex' style={{ gap: "15px" }}>
                    <Avatar src={avt} size={64} />
                    <div className="listAccounts-t" style={{ justifyContent: "space-between" }}>
                        <span>Nguyễn Văn Nam</span>
                        <div className='type'>
                            <span>Sinh viên</span>
                        </div>
                    </div>
                </div>

                <div className="updateFileAndCreateAcc">

                    <Button
                        type="primary" style={{ backgroundColor: "rgba(181, 65, 21, 1)", padding: "10px 16px" }}>
                        <Pen size={20} />
                        Cập nhật thông tin
                    </Button>
                </div>
            </div>
            <FilterDetailAcc />
        </div >
    )
}

export default StudentAccounts
