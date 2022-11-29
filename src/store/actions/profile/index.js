import FIREBASE from '@config/FIREBASE';
import {
  storeData,
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from '@utils';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const updateProfile = data => {
  return (dispatch, getState) => {
    // LOADING
    dispatchLoading(dispatch, UPDATE_PROFILE);
    FIREBASE.database()
      .ref('users/' + data.uid)
      .update(data)
      .then(response => {
        dispatchSuccess(dispatch, UPDATE_PROFILE, response ? response : data);
        // console.log(response, 'newdata');
        storeData('user', data);
      })
      .catch(error => {
        dispatchError(dispatch, UPDATE_PROFILE, error.message);
        alert(error.message);
      });
  };
};
