import { GetProp, message, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const beforeUploadImage = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Sai định dạng hình ảnh!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Kích thước file quá lớn tối đa 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const beforeUploadAudio = (file: File) => {
  const isAudio = file.type.startsWith('audio/');

  const isValidExtension = ['.mp3', '.wav', '.ogg'].includes(
    file.name.slice(-4).toLowerCase(),
  );

  if (!isAudio) {
    message.error('Bạn chỉ được tải file định dạng audio!');
    return false;
  }

  if (!isValidExtension) {
    message.error('Sai định dạng file audio .mp3, .wav, hoặc .ogg.');
    return false;
  }

  return true;
};

export const beforeUploadPdf = (file: File) => {
  const isPdf = file.type === 'application/pdf';
  if (!isPdf) {
    message.error('Chỉ chấp nhận file định dạng PDF!');
    return false;
  }

  // const isLt5M = file.size / 1024 / 1024 < 5;
  // if (!isLt5M) {
  //   message.error('Kích thước file quá lớn, tối đa là 5MB!');
  //   return false;
  // }

  return true;
};

export const beforeUploadExcel = (file: File) => {
  const isExcel =
    file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || // .xlsx
    file.type === 'application/vnd.ms-excel'; // .xls

  if (!isExcel) {
    message.error('Chỉ chấp nhận file định dạng Excel (.xlsx hoặc .xls)!');
    return false;
  }

  // Giới hạn kích thước file nếu muốn (ví dụ 5MB):
  // const isLt5M = file.size / 1024 / 1024 < 5;
  // if (!isLt5M) {
  //   message.error('Kích thước file quá lớn, tối đa là 5MB!');
  //   return false;
  // }

  return true;
};
