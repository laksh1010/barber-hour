import api from '../api';

function fetchBabers(data, getState) {
  return api.get('/customer/barbers', { params: data, headers: { 'Authorization': `Token ${getState().user.token}` } });
}

function listBarbers(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_BARBERS' });

    fetchBabers(data, getState)
      .then(response => dispatch({ type: 'BARBERS_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_BARBERS_ERROR', data: error.data }));
  }
}

function updateBarbersCache(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_BARBERS_UPDATE_CACHE' });

    fetchBabers(data, getState)
      .then(response => dispatch({ type: 'BARBERS_CACHE_UPDATED', data: response.data }))
      .catch(error => dispatch({ type: 'UPDATE_BARBERS_CACHE_ERROR', data: error.data }));
  }
}

function refreshBarbers(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REFRESH_BARBERS' });

    fetchBabers(data, getState)
      .then(response => dispatch({ type: 'BARBERS_REFRESHED', data: response.data }))
      .catch(error => dispatch({ type: 'REFRESH_BARBERS_ERROR', data: error.data }));
  }
}

function toggleService(barberID, serviceID, value) {
  return {
    type: 'TOGGLE_BARBER_SERVICE',
    data: {
      barberID,
      serviceID,
      value
    }
  };
}

export {listBarbers, toggleService, updateBarbersCache, refreshBarbers};
