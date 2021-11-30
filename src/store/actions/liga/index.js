import FIREBASE from '../../../config/FIREBASE';
import {
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from '../../../utils';
export const GET_LIST_LIGA = 'GET_LIST_LIGA';
export const GET_DETAIL_LIGA = 'GET_DETAIL_LIGA';
export const DELETE_DETAIL_LIGA = 'DELETE_DETAIL_LIGA';
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
        dispatchError(dispatch, GET_LIST_LIGA, JSON.stringify(err), null);
      });
  };
};
export const getDetailLiga = id => {
  return dispatch => {
    dispatchLoading(dispatch, GET_DETAIL_LIGA, null);
    // console.log("value, ligas")
    FIREBASE.database()
      .ref('ligas/' + id)
      .once('value', querySnapShot => {
        let value = querySnapShot.val()
          ? {...querySnapShot.val(), uid: id}
          : null;
        console.log(value, '<<< value ligas');
        dispatchSuccess(dispatch, GET_DETAIL_LIGA, value);
      })
      .catch(err => {
        console.log('Error: ', JSON.stringify(err));
        dispatchError(dispatch, GET_DETAIL_LIGA, JSON.stringify(err), null);
      });
  };
};
export const deleteDetailLiga = () => {
  return dispatch => {
    dispatch({
      type: DELETE_DETAIL_LIGA,
    });
  };
};
