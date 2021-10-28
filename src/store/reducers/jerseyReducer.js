import {
  GET_LIST_JERSEY,
  SET_LIGA,
  DELETE_LIGA,
  SET_KEYWORD,
  DELETE_KEYWORD,
} from '../actions/jersey';
const initialState = {
  listJerseyData: null,
  listJerseyLoading: false,
  listJerseyError: '',

  ligaId: '',
  ligaName: '',

  keyword: '',

};
function jerseyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_JERSEY:
      return {
        ...state,
        listJerseyData: action.payload.data,
        listJerseyLoading: action.payload.loading,
        listJerseyError: action.payload.errorMessage,
      };
    case SET_LIGA:
      return {
        ...state,
        ligaId: action.payload.id,
        ligaName: action.payload.name,
      };
    case DELETE_LIGA:
      return {
        ...state,
        ligaId: '',
        ligaName: '',
      };
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload.keyword,
      };
    case DELETE_KEYWORD:
      return {
        ...state,
        keyword: '',
      };
    default:
      return state;
  }
}
export default jerseyReducer;
