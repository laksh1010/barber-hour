import api from '../api';

function loginWithFacebook(event) {
  let {provider, profile} = event;
  let {name, email, id} = profile;
  return {
    type: 'LOGGED_IN',
    data: {
      provider,
      name,
      email,
      id
    }
  }
}

function onLoginFound(event) {
  return {
    type: 'LOGGED_IN',
    data: {
      id: event.credentials.userId
    }
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

function logout() {
  return {
    type: 'LOGGED_OUT'
  };
}

export {loginWithFacebook, onLoginFound, login, logout};
