export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const updateProfile = (data) => {
    return (dispatch, getState) =>{
      // LOADING
      dispatch({
        type: UPDATE_PROFILE,
        payload: {
          data: null,
          loading: true,
          errorMessage: '',
        },
      });
    } 
}