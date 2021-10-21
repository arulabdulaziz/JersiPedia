import {GET_LIST_JERSEY} from '../actions/jersey';
const initialState = {
  listJerseyData: null,
  listJerseyLoading: false,
  listJerseyError: '',
};
function jerseyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_JERSEY:
        console.log("reducer jersey", action.payload)
        console.log("<<<<<<>>>>>>>>>>")
      return {
        ...state,
        listJerseyData: action.payload.data,
        listJerseyLoading: action.payload.loading,
        listJerseyError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
export default jerseyReducer;
