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

export {signup, chooseType};
