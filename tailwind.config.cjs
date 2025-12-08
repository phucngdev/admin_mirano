/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'info-color': '#007AFF',
        'info-color-soft': '#E5F1FF',
        'success-color': '#34C759',
        'success-color-soft': '#EAF9EE',
        'alert-color': '#FFCC00',
        'alert-color-soft': '#FFF9E5',
        'warning-color': '#FF9500',
        'warning-color-soft': '#FFF4E5',
        'error-color': '#FF3B30',
        'error-color-soft': '#FFEBEA',
        'brand-color-primary': '#ED1C24',
        'brand-light-color-primary': '#FFF1F2',

        //text color
        'neutral-1': '#1E2328',
        'neutral-2': '#34383D',
        'neutral-3': '#8E9193',
        'neutral-4': '#BBBDBE',
        'neutral-5': '#E0E0E0',
        'neutral-6': '#EDEDED',
        'neutral-7': '#F5F5F5',

        'grey-2': '#F0EEEE',
      },
      boxShadow: {
        sm: '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)',
        default:
          '0px 0px 1px rgba(12, 26, 75, 0.1), 0px 4px 20px -2px rgba(50, 50, 71, 0.08)',
        lg: '0px 0px 1px rgba(12, 26, 75, 0.1), 0px 10px 16px rgba(20, 37, 63, 0.06)',
        xl: '0px 0px 1px rgba(12, 26, 75, 0.1), 0px 20px 24px rgba(20, 37, 63, 0.06)',
        '2xl':
          '0px 0px 1px rgba(12, 26, 75, 0.1), 0px 30px 40px rgba(20, 37, 63, 0.08)',
        s: '0px 0px 2px 0px rgba(16, 24, 40, 0.06), 0px 0px 3px 0px rgba(16, 24, 40, 0.10)',
        m: '0px 0px 4px -2px rgba(16, 24, 40, 0.06), 0px 0px 8px -2px rgba(16, 24, 40, 0.10)',
      },
      maxWidth: {
        'xxl-container': '1400px',
        'xl-container': '1100px',
        'lg-container': '900px',
        'md-container': '720px',
        'sm-container': '500px',
        'xs-container': '400px',
        'xxs-container': '100%',
      },
    },
    screens: {
      xxl: { max: '1600px' },
      xl: { max: '1200px' },
      lg: { max: '992px' },
      md: { max: '768px' },
      sm: { max: '576px' },
      xs: { max: '480px' },
      xxs: { max: '320px' },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
