import FIREBASE from '../../../config/FIREBASE';
import {
  storeData,
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from '../../../utils';
export const GET_LIST_JERSEY = 'GET_LIST_JERSEY';
export const getListJersey = () => {
  return dispatch => {
    dispatchLoading(dispatch, GET_LIST_JERSEY, null);
    console.log('value, jersey');
    FIREBASE.database()
      .ref('jerseys')
      .once('value', querySnapShot => {
        let value = querySnapShot.val() ? querySnapShot.val() : null;
        // console.log(value, "<<< value ligas");
        dispatchSuccess(dispatch, GET_LIST_JERSEY, value);
      })
      .catch(err => {
        console.log('Error: ', JSON.stringify(err));
        dispatchError(dispatch, GET_LIST_JERSEY, null);
      });
  };
};
export const getListJerseyLimited = () => {
    // console.log('getListJerseyLimited');
  return dispatch => {
    dispatchLoading(dispatch, GET_LIST_JERSEY, null);
    console.log('value, jersey');
    FIREBASE.database()
      .ref('jerseys')
      .limitToLast(6)
      .once('value', querySnapShot => {
        let value = querySnapShot.val() ? querySnapShot.val() : null;
        console.log(value, '<<< value jerseys');
        dispatchSuccess(dispatch, GET_LIST_JERSEY, value);
      })
      .catch(err => {
        console.log('Error: ', JSON.stringify(err));
        dispatchError(dispatch, GET_LIST_JERSEY, null);
      });
  };
};