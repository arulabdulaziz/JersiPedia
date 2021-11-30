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
export const COURIER_SELECTED = 'COURIER_SELECTED';
export const GET_SHIPPING_COST = 'GET_SHIPPING_COST';
import {dispatchLoading, dispatchSuccess, dispatchError} from '../../../utils';
export function getProvinceList() {
  return (dispatch, getState) => {
    console.log('action get Province', API_RAJAONGKIR);
    dispatchLoading(dispatch, GET_PROVINCES, []);
    axios({
      method: 'GET',
      url: API_RAJAONGKIR + 'province',
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
      url: API_RAJAONGKIR + 'city',
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
        let result = null;
        if (response) {
          result = Object.keys(response).map(e => response[e]);
        } else {
          result = [];
        }
        dispatchSuccess(dispatch, GET_COURIERS, result);
      })
      .catch(err => {
        console.log('Error: ', JSON.stringify(err));
        dispatchError(dispatch, GET_COURIERS, []);
      });
  };
}
export function getShippingCost(data, courier) {
  return (dispatch, getState) => {
    dispatchLoading(dispatch, GET_SHIPPING_COST, null);

    const formData = new URLSearchParams();
    const weight = +data.total_weight < 1 ? 1000 : +data.total_weight * 1000;
    formData.append('weight', weight);
    formData.append('origin', +ORIGIN_CITY_ID);
    formData.append('destination', data.profile.city_id);
    formData.append('courier', courier.courier);
    axios({
      method: 'POST',
      url: API_RAJAONGKIR + 'cost',
      timeout: +API_TIMEOUT,
      headers: {
        key: API_KEY,
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: formData,
    })
      .then(response => {
        // console.log("response", JSON.stringify(response.status))
        if (response.status != 200) throw response;
        const shippingCosts = response.data
          ? response.data.rajaongkir.results[0].costs
          : [];
        // console.log(shippingCosts[0], '<<<vv');
        const selectedShippingCost = shippingCosts
          .filter(e => e.service == courier.service)
          .map(e => ({...e, cost: e.cost[0]}));
        // console.log('map', selectedShippingCost);
        dispatchSuccess(
          dispatch,
          GET_SHIPPING_COST,
          selectedShippingCost.length == 0 ? null : selectedShippingCost[0],
        );
        // console.log('map2');
      })
      .catch(error => {
        // console.log("error catch")
        dispatchError(dispatch, GET_SHIPPING_COST, JSON.stringify(error), null);
        alert(JSON.stringify(error));
      });
  };
}
export const resetShippingCost = () => {
  return dispatch => {
    dispatch({
      type: GET_SHIPPING_COST,
      payload: {
        data: null,
        loading: false,
        error: '',
      },
    });
  };
};
