import FIREBASE from '../../../config/FIREBASE';
import {
  storeData,
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from '../../../utils';
export const GET_LIST_LIGA = 'GET_LIST_LIGA';
export const GET_DETAIL_LIGA = 'GET_DETAIL_LIGA';
export const getListLiga = () => {
  return dispatch => {
    dispatchLoading(dispatch, GET_LIST_LIGA, null);
    // console.log("value, ligas")
    FIREBASE.database()
      .ref('ligas')
      .once('value', querySnapShot => {
        let value = querySnapShot.val() ? querySnapShot.val() : null;
        // console.log(value, "<<< value ligas");
        dispatchSuccess(dispatch, GET_LIST_LIGA, value);
      })
      .catch(err => {
        console.log('Error: ', JSON.stringify(err));
        dispatchError(dispatch, GET_LIST_LIGA, null);
      });
  };
};
