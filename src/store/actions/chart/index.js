import FIREBASE from '../../../config/FIREBASE';
import {dispatchLoading, dispatchSuccess, dispatchError} from '../../../utils';
import Snackbar from 'react-native-snackbar';
export const ADD_TO_CHART = 'ADD_TO_CHART';
export const GET_LIST_CHART = 'GET_LIST_CHART';

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
            parseInt(data.amount) * parseFloat(data.jersey.weight);
          const newPrice = parseInt(data.amount) * parseInt(data.jersey.price);

          FIREBASE.database()
            .ref('charts')
            .child(data.uid)
            .update({
              total_price: mainChart.total_price + newPrice,
              total_weight: mainChart.total_weight + newWeight,
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
            date: new Date().toDateString(),
            total_price: parseInt(data.amount) * parseInt(data.jersey.price),
            total_weight:
              parseInt(data.amount) * parseFloat(data.jersey.weight),
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
  return dispatch => {
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
        dispatchSuccess(dispatch, ADD_TO_CHART, response ? response : []);
      })
      .catch(error => {
        dispatchError(dispatch, ADD_TO_CHART, error, []);
        alert(error);
      });
  };
};
export const getListChart = id => {
  return dispatch => {
    // alert("getListChart")
    dispatchLoading(dispatch, GET_LIST_CHART, []);
    FIREBASE.database()
      .ref('charts/' + id)
      .once('value', querySnapshot => {
        const result = querySnapshot.val();
        result.orders = Object.keys(result.orders)
          .map(e => ({...result.orders[e], uid: e}))
          // .map(e => Object.keys(e).map(e2 => e[e2]));
        dispatchSuccess(dispatch, GET_LIST_CHART, result);
      })
      .catch(err => {
        console.log('Error: ', JSON.stringify(err));
        dispatchError(dispatch, GET_LIST_CHART, []);
      });
  };
};
