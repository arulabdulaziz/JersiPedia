import userReducer from './userReducer';
import rajaOngkirReducer from './rajaOngkirReducer';
import authReducer from "./authReducer"
import updateProfileReducer from './profileReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  userReducer,
  rajaOngkirReducer,
  authReducer,
  updateProfileReducer,
});
export default rootReducer;
