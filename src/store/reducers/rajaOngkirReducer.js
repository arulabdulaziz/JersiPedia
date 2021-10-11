import {GET_PROVINCE} from '../actions';

const initialState = {
  getProvinceData: [],
  getProvinceLoading: false,
  getProvinceError: '',
};
function rajaOngkirReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROVINCE:
      return {
        ...state,
        getProvinceData: action.payload.data,
        getProvinceLoading: action.payload.loading,
        getProvinceError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
export default rajaOngkirReducer;
