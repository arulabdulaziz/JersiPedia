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
import FIREBASE from '../../../config/FIREBASE';
export const GET_PROVINCES = 'GET_PROVINCES';
export const GET_CITIES = 'GET_CITIES';
export const PROVINCE_SELECTED = 'PROVINCE_SELECTED';
export const GET_COURIERS = 'GET_COURIERS';
import {dispatchLoading, dispatchSuccess, dispatchError} from '../../../utils';
export function getProvinceList() {
  return (dispatch, getState) => {
    console.log('action get Province', API_RAJAONGKIR);
    dispatchLoading(dispatch, GET_PROVINCES, []);
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
        dispatchSuccess(
          dispatch,
          GET_PROVINCES,
          response.data ? response.data.rajaongkir.results : [],
        );
      })
      .catch(error => {
        // console.log("error catch")
        dispatchError(dispatch, GET_PROVINCES, JSON.stringify(error), []);
        alert(JSON.stringify(error));
      });
  };
}
export function getCityList(province_id) {
  return (dispatch, getState) => {
    console.log('action get City', API_RAJAONGKIR);
    dispatchLoading(dispatch, GET_CITIES, []);
    dispatch({
      type: PROVINCE_SELECTED,
      payload: {
        data: province_id,
      },
    });
    axios({
      method: 'GET',
      url: API_RAJAONGKIR + '/city',
      timeout: +API_TIMEOUT,
      headers: {
        key: API_KEY,
        'content-type': 'application/x-www-form-urlencoded',
      },
      params: {
        province: province_id,
      },
    })
      .then(response => {
        // console.log("response")
        if (response.status != 200) throw response;
        dispatchSuccess(
          dispatch,
          GET_CITIES,
          response.data ? response.data.rajaongkir.results : [],
        );
      })
      .catch(error => {
        // console.log("error catch")
        dispatchError(dispatch, GET_CITIES, JSON.stringify(error), []);
        alert(JSON.stringify(error));
      });
  };
}
export function getCourierList() {
  return (dispatch, getState) => {
    dispatchLoading(dispatch, GET_COURIERS, []);
    FIREBASE.database()
      .ref('couriers/')
      .once('value', querySnapshot => {
        const response = querySnapshot.val() ? querySnapshot.val() : null;
        let result = null
        if(response){
          result = Object.keys(response).map(e => response[e])
        }else{
          result = []
        }
        dispatchSuccess(dispatch, GET_COURIERS, result);
      })
      .catch(err => {
        console.log('Error: ', JSON.stringify(err));
        dispatchError(dispatch, GET_COURIERS, []);
      });
  };
}
