import * as yup from 'yup';

import i18next from 'i18next';
import { regexOnlyIncludeNumber } from '../constants';

export const emailYup = yup
  .string()
  .email(i18next.t('common.validate.email.invalid'));

export const phoneNumberYup = yup
  .string()
  .test(
    'check-validate-phone-number',
    i18next.t('common.validate.mustContainDigitsOnly'),
    (value?: string) => {
      // check match with regex is only include number
      const isMath = regexOnlyIncludeNumber.test(value || '');

      if (!value) return true;

      return isMath;
    },
  )
  .test(
    'check-length-phone-number',
    i18next.t('common.validate.requiredLength', { length: 10 }),
    (value?: string) => {
      if (!value) return true;

      return value.length === 10;
    },
  );

export const urlYup = yup
  .string()
  .url(i18next.t('common.validate.url.invalid'));
