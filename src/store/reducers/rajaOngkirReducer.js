import {GET_PROVINCES, GET_CITIES} from '../actions';

const initialState = {
  getProvinceData: [],
  getProvinceLoading: false,
  getProvinceError: '',
  getCityData: [],
  getCityLoading: false,
  getCityError: '',
};
function rajaOngkirReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROVINCES:
      return {
        ...state,
        getProvinceData: action.payload.data,
        getProvinceLoading: action.payload.loading,
        getProvinceError: action.payload.errorMessage,
      };
    case GET_CITIES:
      // console.log(action.payload);
      return {
        ...state,
        getCityData: action.payload.data,
        getCityLoading: action.payload.loading,
        getCityError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
export default rajaOngkirReducer;
