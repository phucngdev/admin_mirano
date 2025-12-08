import type { IMeta } from '#/api/requests';

export const SIDEBAR_WIDTH = 240;

export const COLLAPSED_SIDEBAR_WIDTH = 60;

export const DEFAULT_PAGE_SIZE_OPTIONS = [20, 50, 100];

export const DEFAULT_PAGE_SIZE = 20;

export const DEFAULT_CURRENT = 1;

export const DEFAULT_TIME_RESENT_OTP = 60 * 1.5; // 1.5 minutes

export const DEFAULT_META: IMeta = {
  limit: DEFAULT_PAGE_SIZE,
  offset: 0,
  total: 0,
};

export const DEFAULT_UINT_DIVIDED_BY_CENT = 100;

export const DEFAULT_DIVIDE_BY_METER = 1000;

export const DEFAULT_MAX_WIDTH_HIDE_NAVBAR = 768;
