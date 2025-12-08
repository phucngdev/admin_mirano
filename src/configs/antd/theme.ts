import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  components: {
    Radio: {
      fontSizeLG: 20,
    },
    Segmented: {
      itemSelectedBg: '#F5F5F5',
    },
  },
  token: {
    borderRadius: 8,

    colorInfo: '#007AFF',
    colorInfoBg: '#E5F1FF',

    /*
     * borderRadiusLG
     * borderRadiusOuter
     * borderRadiusSM
     * borderRadiusXS
     */
    colorPrimary: '#ED1C24',
    colorSuccess: '#00C48C',
    colorSuccessBg: '#D9F6EE',
  },
};
