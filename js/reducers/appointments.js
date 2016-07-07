const initialState = {
  isLoading: false,
  error: false,
  appointments: []
};

function appointments(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_APPOINTMENTS':
    case 'REQUEST_APPOINTMENT_CANCEL':
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case 'APPOINTMENTS_LOADED':
      var {appointments} = action.data;
      return {
        ...state,
        isLoading: false,
        error: false,
        appointments: appointments
      };
    case 'APPOINTMENT_CANCELED':
      var {appointment} = action.data;
      var index = state.appointments.findIndex(a => a.id === appointment.id);
      var oldAppointment = state.appointments.find(a => a.id === appointment.id);
      return {
        ...state,
        isLoading: false,
        error: false,
        appointments: [
          ...state.appointments.slice(0, index),
          Object.assign(oldAppointment, appointment),
          ...state.appointments.slice(index + 1)
        ]
      };
    case 'REQUEST_APPOINTMENTS_ERROR':
    case 'REQUEST_APPOINTMENT_CANCEL_ERROR':
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = appointments;