const initialState = {
  isLoading: false,
  isRefreshing: false,
  error: false,
  barbers: [],
  meta: {}
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
    case 'REFRESH_ADMIN_BARBERS':
      return {
        ...state,
        isRefreshing: true,
        error: false
      };
    case 'ADMIN_BARBERS_LOADED':
      var {barbers, meta} = action.data;
      return {
        ...state,
        isLoading: false,
        error: false,
        barbers: state.barbers.concat(barbers),
        meta: meta
      };
    case 'ADMIN_BARBERS_REFRESHED':
      var {barbers, meta} = action.data;
      return {
        ...state,
        isRefreshing: false,
        error: false,
        barbers: barbers,
        meta: meta
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
        isRefreshing: false,
        error: true
      };
    case 'SET_ADMIN_BARBERS_EDIT_MODE':
      return {
        ...state,
        success: false
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = admin;
