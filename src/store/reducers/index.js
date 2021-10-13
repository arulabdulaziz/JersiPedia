import userReducer from './userReducer';
import rajaOngkirReducer from './rajaOngkirReducer';
import authReducer from "./authReducer"
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  userReducer,
  rajaOngkirReducer,
  authReducer,
});
export default rootReducer;
