import FIREBASE from '../../../config/FIREBASE';
import {
  storeData,
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from '../../../utils';
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const registerUser = (data, password) => {
  return dispatch => {
    // LOADING
    dispatchLoading(dispatch, REGISTER_USER);
    FIREBASE.auth()
      .createUserWithEmailAndPassword(data.email, password)
      .then(success => {
        const newData = {
          ...data,
          uid: success.user.uid,
        };
        console.log(newData, '<< new Data');
        FIREBASE.database()
          .ref('users/' + success.user.uid)
          .set(newData);

        //SUKSES
        dispatchSuccess(dispatch, REGISTER_USER, newData);
        //Local Storage (Async Storage)
        storeData('user', newData);
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, REGISTER_USER, error.message);
        alert(error.message);
      });
  };
};
export const loginUser = (email, password) => {
  return async (dispatch, getState) => {
    try {
      // LOADING
      dispatchLoading(dispatch, LOGIN_USER);
      const auth = await FIREBASE.auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = await FIREBASE.database()
        .ref('users/' + auth.user.uid)
        .once('value');
      if (user.val()) {
        dispatchSuccess(dispatch, LOGIN_USER, user.val());
        storeData('user', user.val());
      } else {
        throw {message: 'Data User Tidak Ditemukan', code: 401};
      }
    } catch (error) {
      // ERROR
      dispatch({
        type: LOGIN_USER,
        payload: {
          data: null,
          loading: false,
          errorMessage: error.message,
        },
      });
      dispatchError(dispatch, LOGIN_USER, error.message);
      alert(error.message);
    }
  };
};
