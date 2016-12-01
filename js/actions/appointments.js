import api from '../api';

function fetchAppointments(userType, data, getState) {
  return api.get(`/${userType}/appointments`, { params: data, headers: { 'Authorization': `Token ${getState().user.token}` } });
}

function listAppointments(userType, data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_APPOINTMENTS' });

    fetchAppointments(userType, data, getState)
      .then(response => dispatch({ type: 'APPOINTMENTS_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_APPOINTMENTS_ERROR', data: error.data }));
  }
}

function refreshAppointments(userType, data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REFRESH_APPOINTMENTS' });

    fetchAppointments(userType, data, getState)
      .then(response => dispatch({ type: 'APPOINTMENTS_REFRESHED', data: response.data }))
      .catch(error => dispatch({ type: 'REFRESH_APPOINTMENTS_ERROR', data: error.data }));
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

function finishAppointment(id) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_APPOINTMENT_FINISH' });

    api.post(`/barber/appointments/${id}/finish`, {}, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'APPOINTMENT_FINISHED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_APPOINTMENT_FINISH_ERROR', data: error.data }));
  }
}

function getAppointment(userType, id) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_GET_APPOINTMENT' });

    api.get(`/${userType}/appointments/${id}`, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'GET_APPOINTMENT_SUCCESS', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_GET_APPOINTMENT_ERROR', data: error.data }));
  }
}

function setEditMode() {
  return {
    type: 'SET_APPOINTMENTS_EDIT_MODE'
  };
}

export {listAppointments, cancelAppointment, finishAppointment, refreshAppointments, getAppointment, setEditMode};
