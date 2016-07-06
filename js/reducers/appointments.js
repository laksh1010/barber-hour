const initialState = {
  isLoading: false,
  error: false,
  appointments: []
};

function appointments(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_APPOINTMENTS':
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
    case 'REQUEST_APPOINTMENTS_ERROR':
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
