import api from '../api';

function addError() {
  return {
    type: 'ADD_APPOINTMENT_ERROR'
  };
}

function createAppointment(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_APPOINTMENT' });

    api.post(`/customer/schedules/${data.id}/appointments`, { service_ids: data.serviceIds }, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'APPOINTMENT_CREATED', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_APPOINTMENT', data: error.data }));
  }
}

export {addError, createAppointment};
