import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';
import { RcFile } from 'antd/es/upload';

const props: UploadProps = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  beforeUpload: (file: RcFile) => {
    const isExcel =
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel';

    if (!isExcel) {
      message.error('Chỉ chấp nhận file Excel (.xlsx hoặc .xls)');
      return Upload.LIST_IGNORE;
    }

    return true;
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} upload thành công`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} upload thất bại.`);
    }
  },
};

interface UploadExcelProps {
  showUploadList?: boolean;
}

const UploadExcel = ({ showUploadList = false }: UploadExcelProps) => (
  <Upload {...props} showUploadList={showUploadList}>
    <Button icon={<img src={ms_excel} alt="icon-excel" />}>
      Tải danh sách
    </Button>
  </Upload>
);

export default UploadExcel;
