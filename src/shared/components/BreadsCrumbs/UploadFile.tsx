import React from 'react';
import { CloudArrowUp } from "@phosphor-icons/react";
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

const props: UploadProps = {
    name: 'file',
    action: 'test',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const UploadFile: React.FC = () => (
    <Upload {...props}>
        <Button className='active-none' icon={<CloudArrowUp size={20} />}>Nhập từ file</Button>
    </Upload>
);

export default UploadFile;