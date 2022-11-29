import FIREBASE from '@config/FIREBASE';
import {
  storeData,
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from '@utils';
export const GET_LIST_JERSEY = 'GET_LIST_JERSEY';
export const SET_LIGA = 'SET_LIGA';
export const DELETE_LIGA = 'DELETE_LIGA';
export const SET_KEYWORD = 'SET_KEYWORD';
export const DELETE_KEYWORD = 'DELETE_KEYWORD';

export const getListJersey = () => {
  return (dispatch, getState) => {
    const {ligaId, keyword} = getState().jerseyReducer;
    dispatchLoading(dispatch, GET_LIST_JERSEY, null);
    if (ligaId) {
      FIREBASE.database()
        .ref('jerseys')
        .orderByChild('liga')
        .equalTo(ligaId)
        .once('value', querySnapShot => {
          let value = querySnapShot.val() ? querySnapShot.val() : null;
          // console.log(value, "<<< value jerseys");
          dispatchSuccess(dispatch, GET_LIST_JERSEY, value);
        })
        .catch(err => {
          console.log('Error: ', JSON.stringify(err));
          dispatchError(dispatch, GET_LIST_JERSEY, JSON.stringify(err), null);
        });
    } else if (keyword) {
      console.log('keyword', keyword);
      FIREBASE.database()
        .ref('jerseys')
        .orderByChild('club')
        .startAt(keyword.toUpperCase())
        .endAt(keyword.toUpperCase() + '\uf8ff')
        .once('value', querySnapShot => {
          console.log(querySnapShot, '<< querySnapSHot');
          let value = querySnapShot.val() ? querySnapShot.val() : null;
          // console.log(value, "<<< value jerseys");
          dispatchSuccess(dispatch, GET_LIST_JERSEY, value);
        })
        .catch(err => {
          console.log('Error: ', JSON.stringify(err));
          dispatchError(dispatch, GET_LIST_JERSEY, JSON.stringify(err), null);
        });
    } else {
      FIREBASE.database()
        .ref('jerseys')
        .once('value', querySnapShot => {
          let value = querySnapShot.val() ? querySnapShot.val() : null;
          // console.log(value, "<<< value jerseys");
          dispatchSuccess(dispatch, GET_LIST_JERSEY, value);
        })
        .catch(err => {
          console.log('Error: ', JSON.stringify(err));
          dispatchError(dispatch, GET_LIST_JERSEY, JSON.stringify(err), null);
        });
    }
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
        // console.log(value, '<<< value jerseys');
        dispatchSuccess(dispatch, GET_LIST_JERSEY, value);
      })
      .catch(err => {
        console.log('Error: ', JSON.stringify(err));
        dispatchError(dispatch, GET_LIST_JERSEY,JSON.stringify(err), null);
      });
  };
};
export const setLiga = (id, name) => {
  return dispatch => {
    dispatch({type: SET_LIGA, payload: {id, name}});
  };
};
export const deleteLiga = () => {
  return dispatch => {
    dispatch({type: DELETE_LIGA});
  };
};
export const setKeyword = keyword => {
  return dispatch => {
    dispatch({type: SET_KEYWORD, payload: {keyword}});
  };
};
export const deleteKeyword = () => {
  return dispatch => {
    dispatch({type: DELETE_KEYWORD});
  };
};
