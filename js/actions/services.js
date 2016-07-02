import api from '../api';

function createServices(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_SERVICES', data: data });

    api.post('/services', { barber: { services_attributes: data } }, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'SERVICES_CREATED', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_SERVICES', data: error.data }));
  }
}

function toggleService(serviceID, value) {
  return {
    type: 'TOGGLE_SERVICE',
    data: {
      serviceID,
      value
    }
  };
}

function changeServicePrice(serviceID, price) {
  return {
    type: 'CHANGE_SERVICE_PRICE',
    data: {
      serviceID,
      price
    }
  };
}

export {createServices, toggleService, changeServicePrice};
