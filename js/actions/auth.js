import api from '../api';

function loginWithFacebook(data) {
  return (dispatch) => {
    fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${data.credentials.token}`)
      .then(response => response.json())
      .then(data => {
        let {name, email, id} = data;

        dispatch({ type: 'REQUEST_LOGIN', data: { email: email } });

        api.post('/user/omniauth', { user: { email: email, uid: id, provider: 'facebook', name: name } })
          .then(response => dispatch({ type: 'LOGGED_IN', data: response.data }))
          .catch(error => dispatch({ type: 'INVALID_LOGIN', status: error.status }));
      });
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
