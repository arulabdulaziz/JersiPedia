import {
  GET_PROVINCES,
  GET_CITIES,
  PROVINCE_SELECTED,
  GET_COURIERS,
  COURIER_SELECTED,
  GET_SHIPPING_COST
} from '../actions';

const initialState = {
  getProvinceData: [],
  getProvinceLoading: false,
  getProvinceError: '',

  provinceSelected: '',

  getCityData: [],
  getCityLoading: false,
  getCityError: '',

  getCouriesData: [],
  getCouriesLoading: false,
  getCouriesError: '',

  courierSelected: '',

  getShippingCostData: null,
  getShippingCostLoading: false,
  getShippingCostError: '',
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
    case PROVINCE_SELECTED:
      // console.log(action.payload);
      return {
        ...state,
        provinceSelected: action.payload.data,
      };
    case GET_COURIERS:
      // console.log(action.payload);
      return {
        ...state,
        getCouriesData: action.payload.data,
        getCouriesLoading: action.payload.loading,
        getCouriesError: action.payload.errorMessage,
      };
    case COURIER_SELECTED:
      return {
        ...state,
        courierSelected: action.payload.data,
      };
    case GET_SHIPPING_COST:
      return {
        ...state,
        getShippingCostData: action.payload.data,
        getShippingCostLoading: action.payload.loading,
        getShippingCostError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
export default rajaOngkirReducer;
