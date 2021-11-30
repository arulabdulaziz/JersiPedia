import {REGISTER_USER, LOGIN_USER, LOGOUT_USER} from '../actions';

const initialState = {
  registerData: null,
  registerLoading: false,
  registerError: '',

  loginData: null,
  loginLoading: false,
  loginError: '',
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
    case LOGIN_USER:
      return {
        ...state,
        loginData: action.payload.data,
        loginLoading: action.payload.loading,
        loginError: action.payload.errorMessage,
      };
    case LOGOUT_USER:
      return {
        ...state,
        registerData: null,
        registerLoading: false,
        registerError: '',
        loginData: null,
        loginLoading: false,
        loginError: '',
      };
    default:
      return state;
  }
}
export default authReducer;
