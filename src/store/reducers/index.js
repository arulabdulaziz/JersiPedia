import userReducer from './userReducer';
import rajaOngkirReducer from './rajaOngkirReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  userReducer,
  rajaOngkirReducer,
});
export default rootReducer;
