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

function updateBarber(barberID, data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_ADMIN_BARBER_UPDATE' });

    api.patch(`/admin/barbers/${barberID}`, { barber: data }, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'ADMIN_BARBER_UPDATED', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_ADMIN_BARBER_UPDATE', data: error.data }));
  }
}

function setEditMode() {
  return {
    type: 'SET_ADMIN_BARBERS_EDIT_MODE'
  };
}

export {listBarbers, toggleActive, updateBarber, setEditMode};
