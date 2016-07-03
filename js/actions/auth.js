import api from '../api';

function loginWithFacebook(event) {
  return (dispatch) => {
    let {provider, profile} = event;
    let {name, email, id} = profile;

    dispatch({ type: 'REQUEST_LOGIN', data: { email: email } });

    api.post('/user/omniauth', { user: { email: email, uid: id, provider: provider, name: name } })
      .then(response => dispatch({ type: 'LOGGED_IN', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_LOGIN', status: error.status }));
  }
}

function login(data) {
  return (dispatch) => {
    dispatch({ type: 'REQUEST_LOGIN', data: data });

    api.post('/user/sign_in', { user: data })
      .then(response => dispatch({ type: 'LOGGED_IN', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_LOGIN', status: error.status }));
  }
}

function logout() {
  return {
    type: 'LOGGED_OUT'
  };
}

export {loginWithFacebook, login, logout};
