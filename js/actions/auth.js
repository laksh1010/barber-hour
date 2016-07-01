import api from '../api';

function loginWithFacebook(event) {
  return (dispatch) => {
    let {provider, profile} = event;
    let {name, email, id} = profile;

    dispatch({ type: 'REQUEST_LOGIN', data: { email: email } });

    api.post('/users/omniauth', { user: { email: email, uid: id, provider: provider, name: name } })
      .then(response => dispatch({ type: 'LOGGED_IN', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_LOGIN', status: error.status }));
  }
}

function login(data) {
  return (dispatch) => {
    dispatch({ type: 'REQUEST_LOGIN', data: data });

    api.post('/users/sign_in', { user: data })
      .then(response => dispatch({ type: 'LOGGED_IN', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_LOGIN', status: error.status }));
  }
}

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

function startPhoneVerification(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_START_PHONE_VERIFICATION', data: data });

    api.post('/users/verify_phone', data, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'PHONE_VERIFICATION_SENT', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_PHONE_VERIFICATION_ERROR', data: error.data }));
  }
}

function verifyPhone(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_VERIFY_PHONE', data: data });

    api.get('/users/verify_phone', { params: data, headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'PHONE_VERIFIED', data: response.data }))
      .catch(error => dispatch({ type: 'PHONE_VERIFICATION_ERROR', data: error.data }));
  }
}

function logout() {
  return {
    type: 'LOGGED_OUT'
  };
}

export {loginWithFacebook, login, logout, signup, chooseType, startPhoneVerification, verifyPhone};
