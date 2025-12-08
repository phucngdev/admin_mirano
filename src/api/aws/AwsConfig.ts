// import AWS from 'aws-sdk';

// AWS.config.update({
//   accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
//   secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
//   region: import.meta.env.VITE_AWS_REGION,
// });

// const s3 = new AWS.S3();

// export const uploadFileToS3 = async (file: File): Promise<string> => {
//   const fileName = `${Date.now()}-${file.name}`;

//   let bucket = '';
//   if (file.type === 'application/pdf') {
//     bucket = import.meta.env.VITE_S3_BUCKET_PDF;
//   } else if (file.type.startsWith('image/')) {
//     bucket = import.meta.env.VITE_S3_BUCKET_IMG;
//   } else {
//     throw new Error('Không hỗ trợ loại file này');
//   }
//   const params: AWS.S3.PutObjectRequest = {
//     Bucket: bucket,
//     Key: fileName,
//     Body: file,
//     ContentType: file.type,
//     ACL: 'public-read',
//   };

//   return new Promise((resolve, reject) => {
//     s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
//       if (err) {
//         console.error('Lỗi khi upload:', err);
//         reject(err);
//       } else {
//         resolve(data.Location); // URL của file sau khi upload
//       }
//     });
//   });
// };

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  },
  region: import.meta.env.VITE_AWS_REGION,
});

export const uploadFileToS3 = async (file: File): Promise<string> => {
  if (!file) throw new Error('No file provided');

  const bucket = import.meta.env.VITE_S3_BUCKET;
  if (!bucket) throw new Error('Bucket name is missing');

  let folder = '';

  if (file.type === 'application/pdf') {
    folder = import.meta.env.VITE_S3_KEY_PDF || 'pdfs/';
  } else {
    folder = import.meta.env.VITE_S3_KEY_IMG || 'uploads/';
  }

  // Tạo tên file unique cho key
  const fileExtension = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
  const key = `${folder}${fileName}`;

  // Chuyển file thành Uint8Array để tránh lỗi stream
  const arrayBuffer = await file.arrayBuffer();
  const body = new Uint8Array(arrayBuffer);

  const command = new PutObjectCommand({
    Body: body,
    Bucket: bucket,
    ContentType: file.type,
    Key: key,
  });

  try {
    await s3Client.send(command);
    const region = import.meta.env.VITE_AWS_REGION;
    console.log('sau send');

    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  } catch (error) {
    console.error('Upload failed Lỗi --------------------- - - - --:');
    console.error('Upload failed:', error);
    throw new Error('Upload failed');
  }
};
