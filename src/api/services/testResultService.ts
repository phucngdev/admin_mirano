import { jsonAxios } from '../axios/axios';

export const getAllTestResultService = async (testId: string) =>
  await jsonAxios.get(`test-result/admin/${testId}`);

export const getAttemptsService = async (testId: string, userId: string) =>
  await jsonAxios.get(`test-result/admin/test/${testId}/user/${userId}`);

export const getTestResultDetailService = async (testResultId: string) =>
  await jsonAxios.get(`test-result/admin/result/${testResultId}`);

export const exportScoreTestResultService = async (
  testId: string,
  rangeType?: 'week' | 'month' | 'year' | 'custom',
  date?: string,
  startDate?: string,
  endDate?: string,
) => {
  const params = new URLSearchParams();

  if (rangeType) params.append('rangeType', rangeType);
  if (date) params.append('date', date);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);

  return await jsonAxios.get(
    `test-result/export/test/${testId}?${params.toString()}`,
    {
      responseType: 'arraybuffer',
    },
  );
};
