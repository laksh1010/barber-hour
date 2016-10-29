import api from '../api';

function fetchBarbers(data, getState) {
  return api.get('/admin/barbers', { params: data, headers: { 'Authorization': `Token ${getState().user.token}` } });
}

function listBarbers(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_REVIEW_ADMIN_BARBERS' });

    fetchBarbers(data, getState)
      .then(response => dispatch({ type: 'REVIEW_ADMIN_BARBERS_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_REVIEW_ADMIN_BARBERS_ERROR', data: error.data }));
  }
}

function refreshBarbers(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REFRESH_REVIEW_ADMIN_BARBERS' });

    fetchBarbers(data, getState)
      .then(response => dispatch({ type: 'REVIEW_ADMIN_BARBERS_REFRESHED', data: response.data }))
      .catch(error => dispatch({ type: 'REFRESH_REVIEW_ADMIN_BARBERS_ERROR', data: error.data }));
  }
}

function toggleActive(barberID, active) {
  return {
    type: 'TOGGLE_REVIEW_BARBER_ACTIVE',
    data: {
      barberID,
      active
    }
  };
}

function updateBarber(barberID, data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_REVIEW_ADMIN_BARBER_UPDATE' });

    api.patch(`/admin/barbers/${barberID}`, { barber: data }, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'REVIEW_ADMIN_BARBER_UPDATED', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_REVIEW_ADMIN_BARBER_UPDATE', data: error.data }));
  }
}

function setEditMode() {
  return {
    type: 'SET_REVIEW_ADMIN_BARBERS_EDIT_MODE'
  };
}

export {listBarbers, toggleActive, updateBarber, setEditMode, refreshBarbers};
