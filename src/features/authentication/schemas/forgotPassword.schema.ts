import { emailYup } from '#/shared/schemas';
import i18next from 'i18next';
import * as yup from 'yup';

export const forgotPassword = yup.object().shape({
  email: emailYup.required(i18next.t('common.validate.requiredField')),
});
