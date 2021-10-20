import userReducer from './userReducer';
import rajaOngkirReducer from './rajaOngkirReducer';
import authReducer from "./authReducer"
import updateProfileReducer from './profileReducer';
import ligaReducer from './ligaReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  userReducer,
  rajaOngkirReducer,
  authReducer,
  updateProfileReducer,
  ligaReducer,
});
export default rootReducer;
