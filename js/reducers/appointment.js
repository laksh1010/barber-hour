const initialState = {
  isLoading: false,
  error: null,
  success: false
};

function appointment(state = initialState, action) {
  switch (action.type) {
    case 'ADD_APPOINTMENT_ERROR':
      return {
        ...state,
        error: 'Por favor, selecione um horário e pelo menos um serviço.'
      };
    case 'SELECT_SCHEDULE':
    case 'TOGGLE_BARBER_SERVICE':
      return {
        ...state,
        error: null
      };
    case 'REQUEST_APPOINTMENT':
      return {
        ...state,
        isLoading: true,
        error: null,
        success: false
      };
    case 'APPOINTMENT_CREATED':
      return {
        ...state,
        isLoading: false,
        error: null,
        success: true
      };
    case 'INVALID_APPOINTMENT':
      var {schedule} = action.data;
      var error = schedule[0];
      return {
        ...state,
        isLoading: false,
        error: error,
        success: false
      };
    case 'REQUEST_SCHEDULES':
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = appointment;
