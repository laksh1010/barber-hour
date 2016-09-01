import api from '../api';

function listBarbers(data = {city_id: 1}) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_BARBERS' });

    api.get('/customer/barbers', { params: data, headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'BARBERS_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_BARBERS_ERROR', data: error.data }));
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

export {listBarbers, toggleService};
