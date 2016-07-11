const initialState = {
  isLoading: false,
  error: false,
  barbers: []
};

function admin(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_BARBER_ACTIVE':
      var {barberID, active} = action.data;
      var barber = state.barbers.find(barber => barber.id === barberID);
      var index = state.barbers.findIndex(barber => barber.id === barberID);
      return {
        ...state,
        barbers: [
          ...state.barbers.slice(0, index),
          Object.assign(barber, { active: active }),
          ...state.barbers.slice(index + 1)
        ]
      };
    case 'REQUEST_ADMIN_BARBERS':
    case 'REQUEST_ADMIN_BARBER_UPDATE':
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case 'ADMIN_BARBERS_LOADED':
      var {barbers} = action.data;
      return {
        ...state,
        isLoading: false,
        error: false,
        barbers: barbers
      };
    case 'ADMIN_BARBER_UPDATED':
      return {
        ...state,
        isLoading: false,
        error: false,
        success: true
      };
    case 'REQUEST_ADMIN_BARBERS_ERROR':
    case 'INVALID_ADMIN_BARBER_UPDATE':
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case 'SET_ADMIN_BARBERS_EDIT_MODE':
      return {
        ...state,
        success: false
      };
    default:
      return state;
  }
}

module.exports = admin;
