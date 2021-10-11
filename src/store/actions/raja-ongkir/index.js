import axios from 'axios';
import {
  API_RAJAONGKIR,
  API_TOKEN,
  API_TIMEOUT,
  API_KEY,
  ORIGIN_CITY_ID,
  URL_MIDTRANS_API,
  URL_MIDTRANS_STATUS_API,
} from '@env';
// import {API_HEADER_RAJAONGKIR_COST} from '../../../utils';
export const GET_PROVINCE = 'GET_PROVINCE';

export function getProvinceList() {
  return (dispatch, getState) => {
    console.log('action get Province', API_RAJAONGKIR);
    dispatch({
      type: GET_PROVINCE,
      payload: {
        data: [],
        loading: true,
        errorMessage: '',
      },
    });
    axios({
      method: 'GET',
      url: API_RAJAONGKIR + '/province',
      timeout: +API_TIMEOUT,
      headers: {
        key: API_KEY,
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        // console.log("response")
        if (response.status != 200) throw response;
        dispatch({
          type: GET_PROVINCE,
          payload: {
            data: response.data ? response.data.rajaongkir.results : [],
            loading: false,
            errorMessage: '',
          },
        });
      })
      .catch(error => {
        // console.log("error catch")
        dispatch({
          type: GET_PROVINCE,
          payload: {
            data: [],
            loading: false,
            errorMessage: JSON.stringify(error),
          },
        });
        alert(JSON.stringify(error));
      });
  };
}
