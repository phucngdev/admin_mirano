import i18next from 'i18next';
import * as yup from 'yup';
import { passwordYup } from './common';

export const resetPasswordSchema = yup.object().shape({
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password')], i18next.t('resetPassword.passwordNotMatch'))
    .required(i18next.t('common.validate.password.required')),
  password: passwordYup.matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    i18next.t('resetPassword.passwordInvalid'),
  ),
});
