import {
  API_RAJAONGKIR as RAJAONGKIR_API,
  API_TOKEN,
  API_TIMEOUT as TIMEOUT,
  API_KEY as KEY,
  ORIGIN_CITY_ID,
  URL_MIDTRANS_API,
  URL_MIDTRANS_STATUS_API,
} from '@env';
export const heightMobileUI = 896;
export const widthMobileUI = 414;
export const API_RAJAONGKIR = RAJAONGKIR_API;
export const API_KEY = KEY;
export const API_TIMEOUT = +TIMEOUT;
export const API_HEADER_RAJAONGKIR_COST = {
  key: API_KEY,
  'content-type': 'application/x-www-form-urlencoded',
};
export const HEADER_MIDTRANS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Basic ${API_KEY}`,
};
export const URL_MIDTRANS = URL_MIDTRANS_API;
export const URL_MIDTRANS_STATUS = URL_MIDTRANS_STATUS_API;
export const ORIGIN_CITY = +ORIGIN_CITY_ID;
