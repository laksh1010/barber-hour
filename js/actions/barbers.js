import api from '../api';

function listBarbers() {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_BARBERS' });

    api.get('/customer/barbers', { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'BARBERS_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_BARBERS_ERROR', data: error.data }));
  }
}

export {listBarbers};
