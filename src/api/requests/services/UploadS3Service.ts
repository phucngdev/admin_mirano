/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UploadS3Service {

  /**
   * Get single file upload URL
   * @param filename Name of the file to upload
   * @param contentType Content type of the file (e.g. image/jpeg)
   * @returns any Returns the upload URL and key
   * @throws ApiError
   */
  public static uploadS3ControllerGetUploadUrl(
    filename: string,
    contentType: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/upload-s3/upload-url',
      query: {
        'filename': filename,
        'contentType': contentType,
      },
    });
  }

  /**
   * Get multiple files upload URLs
   * @param files JSON string of files array containing filename and contentType
   * @returns any Returns array of upload URLs and keys
   * @throws ApiError
   */
  public static uploadS3ControllerGetMultiUploadUrls(
    files: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/upload-s3/upload-urls',
      query: {
        'files': files,
      },
    });
  }

}
