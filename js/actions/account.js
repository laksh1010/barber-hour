import api from '../api';

function signup(data) {
  return (dispatch) => {
    dispatch({ type: 'REQUEST_SIGNUP', data: data });

    api.post('/users/sign_up', { user: data })
      .then(response => dispatch({ type: 'SIGNED_UP', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_SIGNUP', data: error.data }));
  }
}

function chooseType(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_CHOOSE_TYPE', data: data });

    api.post('/users/choose_type', { user: data }, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'TYPE_CHOOSEN', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_CHOOSE_TYPE', status: error.status }));
  }
}

function update(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_ACCOUNT_UPDATE', data: data });

    api.post('/users/account', { user: data }, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'ACCOUNT_UPDATED', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_ACCOUNT_UPDATE', data: error.data }));
  }
}

function updatePassword(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_PASSWORD_UPDATE', data: data });

    api.post('/users/password', { user: data }, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'PASSWORD_UPDATED', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_PASSWORD_UPDATE', data: error.data }));
  }
}

function addError() {
  return {
    type: 'ADD_ACCOUNT_ERROR'
  };
}

export {signup, chooseType, update, updatePassword, addError};
