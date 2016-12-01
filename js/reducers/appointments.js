const initialState = {
  isLoading: false,
  error: false,
  isFinishing: false,
  isRefreshing: false,
  appointments: [],
  success: false,
  meta: {}
};

function appointments(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_APPOINTMENTS':
    case 'REQUEST_GET_APPOINTMENT':
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case 'REQUEST_APPOINTMENT_CANCEL':
      return {
        ...state,
        isLoading: true,
        success: false,
        error: false
      };
    case 'REFRESH_APPOINTMENTS':
      return {
        ...state,
        isRefreshing: true,
        error: false
      };
    case 'REQUEST_APPOINTMENT_FINISH':
      return {
        ...state,
        isFinishing: true,
        error: false
      };
    case 'APPOINTMENTS_LOADED':
      var {appointments, meta} = action.data;
      var newAppointments = appointments.filter(item => !state.appointments.find(a => a.id === item.id));
      return {
        ...state,
        isLoading: false,
        error: false,
        appointments: state.appointments.concat(newAppointments),
        meta: meta
      };
    case 'APPOINTMENTS_REFRESHED':
      var {appointments, meta} = action.data;
      return {
        ...state,
        isRefreshing: false,
        error: false,
        appointments: appointments,
        meta: meta
      };
    case 'APPOINTMENT_CREATED':
      var {appointment} = action.data;
      return {
        ...state,
        isLoading: false,
        error: false,
        isFinishing: false,
        appointments: [appointment].concat(state.appointments)
      };
    case 'APPOINTMENT_FINISHED':
      var {appointment} = action.data;
      var index = state.appointments.findIndex(a => a.id === appointment.id);
      var oldAppointment = state.appointments.find(a => a.id === appointment.id);
      return {
        ...state,
        isLoading: false,
        error: false,
        isFinishing: false,
        appointments: [
          ...state.appointments.slice(0, index),
          Object.assign(oldAppointment, appointment),
          ...state.appointments.slice(index + 1)
        ]
      };
    case 'APPOINTMENT_CANCELED':
      var {appointment} = action.data;
      var index = state.appointments.findIndex(a => a.id === appointment.id);
      var oldAppointment = state.appointments.find(a => a.id === appointment.id);
      return {
        ...state,
        isLoading: false,
        error: false,
        isFinishing: false,
        success: true,
        appointments: [
          ...state.appointments.slice(0, index),
          Object.assign(oldAppointment, appointment),
          ...state.appointments.slice(index + 1)
        ]
      };
    case 'REQUEST_APPOINTMENTS_ERROR':
    case 'REFRESH_APPOINTMENTS_ERROR':
    case 'REQUEST_GET_APPOINTMENT_ERROR':
      return {
        ...state,
        isLoading: false,
        isRefreshing: false,
        error: true
      };
    case 'REQUEST_APPOINTMENT_CANCEL_ERROR':
      return {
        ...state,
        success: false,
        isLoading: false,
        isRefreshing: false,
        error: true
      };
    case 'REQUEST_APPOINTMENT_FINISH_ERROR':
      return {
        ...state,
        isLoading: false,
        isFinishing: false,
        error: 'o corte só pode ser finalizado depois de terminado'
      };
    case 'GET_APPOINTMENT_SUCCESS':
      var {appointment} = action.data;
      return {
        ...state,
        isLoading: false,
        error: false,
        appointments: state.appointments.concat(appointment)
      };
    case 'SET_APPOINTMENTS_EDIT_MODE':
      return {
        ...state,
        success: false,
        error: false
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = appointments;
