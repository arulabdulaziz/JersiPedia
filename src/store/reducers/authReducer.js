import {REGISTER_USER} from '../actions';

const initialState = {
  registerData: null,
  registerLoading: false,
  registerError: '',
};
function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        registerData: action.payload.data,
        registerLoading: action.payload.loading,
        registerError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
export default authReducer;
