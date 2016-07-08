import api from '../api';

function sendResetPassword(data) {
  return (dispatch) => {
    dispatch({ type: 'REQUEST_SEND_RESET_PASSWORD', data: data });

    api.post('/user/reset_password', { user: data })
      .then(response => dispatch({ type: 'RESET_PASSWORD_SENT', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_SEND_RESET_PASSWORD', data: error.data }));
  }
}

export {sendResetPassword};
