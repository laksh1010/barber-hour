import api from '../api';

function listBarbers() {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_ADMIN_BARBERS' });

    api.get('/admin/barbers', { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'ADMIN_BARBERS_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_ADMIN_BARBERS_ERROR', data: error.data }));
  }
}

function toggleActive(barberID, active) {
  return {
    type: 'TOGGLE_BARBER_ACTIVE',
    data: {
      barberID,
      active
    }
  };
}

export {listBarbers, toggleActive};
