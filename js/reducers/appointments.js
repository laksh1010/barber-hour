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
      console.log('APPOINTMENTS_LOADED', action.data)
      var {appointments} = action.data;
      return {
        ...state,
        isLoading: false,
        error: false,
        appointments: appointments
      };
    case 'REQUEST_APPOINTMENTS_ERROR':
      console.log('APPOINTMENTS_LOADED', action.data)
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
}

module.exports = appointments;
