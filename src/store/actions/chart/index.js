import FIREBASE from '../../../config/FIREBASE';
import {dispatchLoading, dispatchSuccess, dispatchError, formatDateToSaveDb} from '../../../utils';
import Snackbar from 'react-native-snackbar';
export const ADD_TO_CHART = 'ADD_TO_CHART';
export const GET_LIST_CHART = 'GET_LIST_CHART';
export const LOADING_DELETE_CHART = 'LOADING_DELETE_CHART';
import moment from 'moment';
export const addToChart = data => {
  return dispatch => {
    dispatchLoading(dispatch, ADD_TO_CHART, []);
    // Cek Apakah Data Keranjang User tersebut sudah ada atau tidak
    FIREBASE.database()
      .ref('charts/' + data.uid)
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          //Update Keranjang Utama
          const mainChart = querySnapshot.val();
          const newWeight =
            parseInt(+data.amount) * parseFloat(+data.jersey.weight);
          const newPrice =
            parseInt(+data.amount) * parseInt(+data.jersey.price);

          FIREBASE.database()
            .ref('charts')
            .child(data.uid)
            .update({
              total_price: +mainChart.total_price + newPrice,
              total_weight: +mainChart.total_weight + newWeight,
            })
            .then(response => {
              //Simpan Ke Keranjang Detail
              dispatch(addChartDetail(data));
            })
            .catch(error => {
              dispatchError(dispatch, ADD_TO_CHART, error, []);
              alert(error);
            });
        } else {
          //Simpan Keranjang Utama
          const newChart = {
            user: data.uid,
            date: moment().format(formatDateToSaveDb),
            total_price: parseInt(+data.amount) * parseInt(+data.jersey.price),
            total_weight:
              parseInt(+data.amount) * parseFloat(+data.jersey.weight),
          };
          FIREBASE.database()
            .ref('charts')
            .child(data.uid)
            .set(newChart)
            .then(response => {
              dispatch(addChartDetail(data));
            });
        }
      })
      .catch(error => {
        dispatchError(dispatch, ADD_TO_CHART, error, []);
        alert(JSON.stringify(error));
      });
  };
};
export const addChartDetail = data => {
  return (dispatch, getState) => {
    const orders = {
      product: data.jersey,
      total_order: data.amount,
      total_price: parseInt(data.amount) * parseInt(data.jersey.price),
      total_weight: parseInt(data.amount) * parseFloat(data.jersey.weight),
      note: data.note,
      size: data.size,
    };

    FIREBASE.database()
      .ref('charts/' + data.uid)
      .child('orders')
      .push(orders)
      .then(response => {
        Snackbar.show({
          text: 'Berhasil Menambahkan Ke Keranjang',
          duration: Snackbar.LENGTH_SHORT,
        });
        const charts = getState().chartReducer.listChartData
        let newChart = {}
        if(charts) newChart = {...charts}
        else newChart ={orders: []}
        newChart.orders.push(orders);
        dispatchSuccess(dispatch, ADD_TO_CHART, response ? response : []);
        dispatchSuccess(dispatch, GET_LIST_CHART, newChart);
      })
      .catch(error => {
        dispatchError(dispatch, ADD_TO_CHART, JSON.stringify(error), []);
        alert(error);
      });
  };
};
export const getListChart = id => {
  return dispatch => {
    // alert("getListChart")
    dispatchLoading(dispatch, GET_LIST_CHART, null);
    FIREBASE.database()
      .ref('charts/' + id)
      .once('value', querySnapshot => {
        const response = querySnapshot.val() ? querySnapshot.val() : null;
        let result = null;
        if (response) {
          result = {...response, uid: id};
          if (result.orders) {
            result.orders = Object.keys(result.orders).map(e => ({
              ...result.orders[e],
              uid: e,
            }));
          }
        }
        dispatchSuccess(dispatch, GET_LIST_CHART, result);
      })
      .catch(err => {
        console.log('Error: ', JSON.stringify(err));
        dispatchError(dispatch, GET_LIST_CHART, JSON.stringify(err), null);
      });
  };
};
export const deleteChart = chart => {
  return (dispatch, getState) => {
    dispatch({type: LOADING_DELETE_CHART, payload: {loading: true}});
    const charts = getState().chartReducer.listChartData;
    const newData = {
      date: moment().format(formatDateToSaveDb),
      total_price: +charts.total_price - +chart.total_price,
      total_weight: +charts.total_weight - +chart.total_weight,
    };
    if (newData.total_price == 0) {
      FIREBASE.database()
        .ref('charts/' + charts.uid)
        .remove()
        .then(response => {
          dispatchSuccess(dispatch, GET_LIST_CHART, null);
        })
        .catch(error => {
          alert(JSON.stringify(error));
        })
        .finally(_ => {
          dispatch({type: LOADING_DELETE_CHART, payload: {loading: false}});
        });
    } else {
      FIREBASE.database()
        .ref('charts/' + charts.uid)
        .child('orders/' + chart.uid)
        .remove()
        .then(response => {
          return FIREBASE.database()
            .ref('charts')
            .child(charts.uid)
            .update(newData);
        })
        .then(response => {
          dispatchSuccess(dispatch, GET_LIST_CHART, {
            ...charts,
            total_price: +newData.total_price,
            total_weight: +newData.total_weight,
            orders: charts.orders.filter(e => e.uid != chart.uid),
          });
        })
        .catch(error => {
          alert(JSON.stringify(error));
        })
        .finally(_ => {
          dispatch({type: LOADING_DELETE_CHART, payload: {loading: false}});
        });
    }
  };
};
/**
 * install ini untuk spinner untuk loading delete
 * https://www.npmjs.com/package/react-native-loading-spinner-overlay
 * https://github.com/joinspontaneous/react-native-loading-spinner-overlay/blob/master/example/App.js
 */
