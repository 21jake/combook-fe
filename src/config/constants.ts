const config = {
  VERSION: process.env.VERSION,
};

export default config;

const suffix = 'api/v1/';

export const SERVER_API_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:5000/${suffix}`
    : `http://192.168.169.171:8082${suffix}`;

export const AUTHORITIES = {
  ADMIN: 'admin',
  PARENT: 'parent',
  TEACHER: 'teacher',
};

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error',
};

export const DEFAULT_PASSWORD = "123456789"

export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const APP_LOCAL_DATETIME_FORMAT_Z = 'YYYY-MM-DDTHH:mm Z';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';
export const GOOGLE_MAP_KEY = 'AIzaSyBBFYbIR5lqnbebJe66SCxgKQ6LjpmKAUw';
