import axios from 'axios';
import { formDataAxios } from '../axios/axios';

export const uploadFileToS3 = async (file: File) => {
  const res = await formDataAxios.get(
    `upload-s3/upload-url?filename=${file.name}&contentType=${file.type}`,
  );
  const { url, publicUrl } = res.data.data;
  await axios.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  });

  return {
    publicUrl,
    url,
  };
};

export const uploadMultipleFileToS3 = async (files: File[]) => {
  const query = `files=${encodeURIComponent(
    JSON.stringify(
      files.map(file => ({
        contentType: file.type,
        filename: file.name,
      })),
    ),
  )}`;

  const res = await formDataAxios.get(`/upload-s3/upload-urls?${query}`);
  const { data } = res.data;

  const uploadResults = await Promise.all(
    data.map(async (fileData: any, index: number) => {
      const file = files[index];

      await axios.put(fileData.url, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      return {
        filename: fileData.filename,
        key: fileData.key,
        publicUrl: fileData.publicUrl,
        url: fileData.url,
      };
    }),
  );

  return uploadResults;
};
