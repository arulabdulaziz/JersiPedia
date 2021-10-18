import FIREBASE from '../../../config/FIREBASE';
import {storeData} from '../../../utils';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const updateProfile = data => {
  return (dispatch, getState) => {
    // LOADING
    dispatch({
      type: UPDATE_PROFILE,
      payload: {
        data: null,
        loading: true,
        errorMessage: '',
      },
    });
    FIREBASE.database()
      .ref('users/' + data.uid)
      .update(data)
      .then(response => {
        dispatch({
          type: UPDATE_PROFILE,
          payload: {
            data: response ? response : data,
            loading: false,
            errorMessage: '',
          },
        });
        // console.log(response, 'newdata');
        storeData('user', data);
      })
      .catch(error => {
        dispatch({
          type: UPDATE_PROFILE,
          payload: {
            data: null,
            loading: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
