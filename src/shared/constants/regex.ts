export const regexOnlyIncludeNumber = /^[0-9]+$/;

export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?~-]).{8,}$/;

export const PHONE_NUMBER_REGEX = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
