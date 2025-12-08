import * as yup from 'yup';

import i18next from 'i18next';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required(i18next.t('common.validate.email.required')),
  password: yup
    .string()
    .required(i18next.t('common.validate.password.required')),
});
