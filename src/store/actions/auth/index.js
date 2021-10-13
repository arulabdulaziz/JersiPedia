import FIREBASE from '../../../config/FIREBASE';
import { storeData } from '../../../utils';
export const REGISTER_USER = 'REGISTER_USER';

export const registerUser = (data, password) => {
  return dispatch => {
    // LOADING
    dispatch({
      type: REGISTER_USER,
      payload: {
        data: null,
        loading: true,
        errorMessage: '',
      },
    });
    FIREBASE.auth()
      .createUserWithEmailAndPassword(data.email, password)
      .then(success => {
        const newData = {
          ...data,
          uid: success.user.uid,
        };
        
        FIREBASE.database()
          .ref('users/' + success.user.uid)
          .set(newData);

        //SUKSES
        dispatch({
          type: REGISTER_USER,
          payload: {
            data: dataBaru,
            loading: true,
            errorMessage: '',
          },
        });

        //Local Storage (Async Storage)
        storeData('user', newData);
      })
      .catch(error => {
        // ERROR
        dispatch({
          type: REGISTER_USER,
          payload: {
            data: null,
            loading: true,
            errorMessage: error.message,
          },
        });
        alert(error.message);
      });
  };
};
