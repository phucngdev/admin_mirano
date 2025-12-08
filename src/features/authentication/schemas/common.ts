import * as yup from 'yup';

import i18next from 'i18next';

export const emailYup = yup
  .string()
  .trim()
  .email(i18next.t('common.validate.email.invalid'))
  .required(i18next.t('common.validate.email.required'));

export const passwordYup = yup
  .string()
  .trim()
  .required(i18next.t('common.validate.password.required'));
