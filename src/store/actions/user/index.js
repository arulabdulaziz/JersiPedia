export const GET_USER = "GET_USER"

export function getUser() {
    return (dispatch, getState) => {
        dispatch({
          type: GET_USER,
          payload: {
            name: 'Amin Richman',
            email: 'amin@gmail.com',
            phone: '085712312333',
            address: 'Jalan Kekayaan No 99',
            city: 'Semarang',
            province: 'Jawa Tengah',
          },
        });
    }
}