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
        barbers: [
          ...state.barbers.slice(0, index),
          Object.assign(barber, { active: active }),
          ...state.barbers.slice(index + 1)
        ]
      };
    case 'REQUEST_ADMIN_BARBERS':
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
    case 'REQUEST_ADMIN_BARBERS_ERROR':
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
}

module.exports = admin;
