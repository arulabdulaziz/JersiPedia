import { ADD_TO_CHART, GET_LIST_CHART, LOADING_DELETE_CHART } from "../actions";
const initialState = {
  addChartLoading: false,
  addChartResult: [],
  addChartError: '',

  listChartData: [],
  listChartLoading: false,
  listChartError: '',

  deleteChartLoading: false,
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
    case LOADING_DELETE_CHART:
      return {
        ...state,
        deleteChartLoading: action.payload.loading,
      };
    default:
      return state;
  }
}