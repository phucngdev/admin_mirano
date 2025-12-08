import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { StorageKey } from '../constants';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from './localStorage';

export const REDUCE_EXPIRE_TIME = 10 * 60; // 10 minutes

export const getToken = () => getLocalStorageItem(StorageKey.AccessToken);

export const setToken = (token: string) => {
  setLocalStorageItem(StorageKey.AccessToken, token);
};

export const getRefreshToken = () =>
  getLocalStorageItem(StorageKey.RefreshToken);

export const setRefreshToken = (refreshToken: string) => {
  setLocalStorageItem(StorageKey.RefreshToken, refreshToken);
};

export const setBusinessId = (businessId: string) => {
  setLocalStorageItem(StorageKey.BusinessId, businessId);
};

export const getBusinessId = () => getLocalStorageItem(StorageKey.BusinessId);

interface TokenResponse {
  isExpiredToken: boolean;
  isCanRefetchToken: boolean;
}

/**
 * Checks the expiration of an access token and a refresh token.
 *
 * @param {string} accessToken - The access token to check.
 * @param {string} refreshToken - The refresh token to check.
 * @return {TokenResponse} An object indicating whether the token can be refreshed and whether the access token is expired.
 */
export function checkTokenExpiration(
  accessToken: string,
  refreshToken: string,
): TokenResponse {
  try {
    const accessTokenDecoded = jwtDecode<{ exp: number }>(accessToken);
    const refreshTokenDecoded = jwtDecode<{ exp: number }>(refreshToken);

    const soonExpirationThreshold = REDUCE_EXPIRE_TIME; // 10 minutes in seconds

    const now = dayjs().unix() + soonExpirationThreshold; // Get current timestamp in seconds

    const isExpiredToken = now >= accessTokenDecoded.exp;
    const isCanRefetchToken = now < refreshTokenDecoded.exp;

    return { isCanRefetchToken, isExpiredToken };
  } catch (error) {
    return { isCanRefetchToken: false, isExpiredToken: true };
  }
}

/**
 * Removes the tokens from the local storage and redirects the user to the login page.
 *
 * @param {none} - This function does not have any parameters.
 * @return {none} - This function does not return any value.
 */
export function beforeLogout() {
  removeLocalStorageItem(StorageKey.AccessToken);
  removeLocalStorageItem(StorageKey.RefreshToken);

  window.location.href = '/login';
}
