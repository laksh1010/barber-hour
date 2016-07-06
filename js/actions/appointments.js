import api from '../api';

function listAppointments(userType) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_APPOINTMENTS' });

    api.get(`/${userType}/appointments`, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'APPOINTMENTS_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_APPOINTMENTS_ERROR', data: error.data }));
  }
}

function cancelAppointment(userType, id) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_APPOINTMENT_CANCEL' });

    api.delete(`/${userType}/appointments/${id}`, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'APPOINTMENT_CANCELED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_APPOINTMENT_CANCEL_ERROR', data: error.data }));
  }
}

export {listAppointments, cancelAppointment};
