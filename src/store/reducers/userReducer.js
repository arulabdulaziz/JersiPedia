import {GET_USER} from '../actions';

const initialState = {
  dataUser: null,
};
function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, dataUser: action.payload};
    default:
      return state;
  }
}
export default userReducer
