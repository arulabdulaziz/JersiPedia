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
        registerData: action.payload.data,
        registerLoading: action.payload.loading,
        registerError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
export default updateProfileReducer;
