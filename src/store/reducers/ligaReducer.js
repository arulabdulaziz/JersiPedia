import { GET_LIST_LIGA, GET_DETAIL_LIGA } from "../actions/liga";
const initialState = {
 listLigaData: null,
 listLigaLoading: false,
 listLigaError: '',
};
function ligaReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_LIGA:
      return {
        ...state,
        listLigaData: action.payload.data,
        listLigaLoading: action.payload.loading,
        listLigaError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
export default ligaReducer;