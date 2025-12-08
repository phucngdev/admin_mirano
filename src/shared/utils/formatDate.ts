import dayjs from 'dayjs';

export const formatDate = (
  date: string | Date | dayjs.Dayjs | null,
): string => {
  if (!date) return '';
  return dayjs(date).format('YYYY/MM/D');
};
