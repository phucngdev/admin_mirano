export const API_ENDPOINTS = {
  ACCOUNTS: {
    BASE: '/accounts',
    BY_ID: (id: string) => `/accounts/${id}`,
    PROFILE: '/accounts/profile',
  },
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    REGISTER: '/auth/register',
  },
  COMBOS: {
    BASE: '/combos',
    BY_ID: (id: string) => `/combos/${id}`,
  },
  COURSES: {
    BASE: '/courses',
    BY_ID: (id: string) => `/courses/${id}`,
    CATEGORIES: '/courses/categories',
  },
  MARKETING: {
    BASE: '/marketing',
    CAMPAIGNS: '/marketing/campaigns',
    PROMOTIONS: '/marketing/promotions',
  },
  MEMBERSHIPS: {
    BASE: '/memberships',
    BY_ID: (id: string) => `/memberships/${id}`,
  },
  SALES: {
    BASE: '/sales',
    ORDERS: '/sales/orders',
    TRANSACTIONS: '/sales/transactions',
  },
  SETTINGS: {
    BASE: '/settings',
    DISPLAY: '/settings/display',
    SYSTEM: '/settings/system',
  },
};
