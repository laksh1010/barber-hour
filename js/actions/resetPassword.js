import api from '../api';

function sendResetPassword(data) {
  return (dispatch) => {
    dispatch({ type: 'REQUEST_SEND_RESET_PASSWORD', data: data });

    api.post('/user/reset_password', { user: data })
      .then(response => dispatch({ type: 'RESET_PASSWORD_SENT', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_SEND_RESET_PASSWORD', data: error.data }));
  }
}

function newPassword(data, token) {
  return (dispatch) => {
    dispatch({ type: 'REQUEST_NEW_PASSWORD', data: data });

    var requestData = {
      password: data.password,
      password_confirmation: data.password_confirmation,
      reset_password_token: token
    };

    api.post('/user/update_password', { user: requestData })
      .then(response => dispatch({ type: 'NEW_PASSWORD_CREATED', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_NEW_PASSWORD', data: error.data }));
  }
}

export {sendResetPassword, newPassword};
