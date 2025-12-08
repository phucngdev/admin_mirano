import type { ApiError } from '#/api/requests';
import { notification } from 'antd';
import i18next from 'i18next';

export const showErrorMessage = (e: ApiError) => {
  const errorMessages = e.body?.message;

  const firstMessage = errorMessages?.[0] as string;

  if (firstMessage) {
    notification.error({
      description: firstMessage,
      message: i18next.t('common.error.opp'),
    });
  }
};
