import { ADD_TO_CHART, GET_LIST_CHART } from "../actions";
const initialState = {
  addChartLoading: false,
  addChartResult: [],
  addChartError: '',

  listChartData: [],
  listChartLoading: false,
  listChartError: '',
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CHART:
      return {
        ...state,
        addChartLoading: action.payload.loading,
        addChartResult: action.payload.data,
        addChartError: action.payload.errorMessage,
      };
    case GET_LIST_CHART:
      return {
        ...state,
        listChartLoading: action.payload.loading,
        listChartData: action.payload.data,
        listChartError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}