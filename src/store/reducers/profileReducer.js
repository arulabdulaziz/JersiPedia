import {UPDATE_PROFILE} from '../actions';
const initialState = {
  updateProfileData: null,
  updateProfileLoading: false,
  updateProfileError: '',
};
function updateProfileReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        updateProfileData: action.payload.data,
        updateProfileLoading: action.payload.loading,
        updateProfileError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
export default updateProfileReducer;
