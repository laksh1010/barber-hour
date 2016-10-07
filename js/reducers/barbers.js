const initialState = {
  isLoading: false,
  isRefreshing: false,
  error: false,
  barbers: [],
  meta: {}
};

function barbers(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_BARBER_SERVICE':
      var {barberID, serviceID, value} = action.data;
      var barber = state.barbers.find(barber => barber.id === barberID);
      var index = state.barbers.findIndex(barber => barber.id === barberID);
      var services = barber.services.map(service => {
        if (service.id === serviceID) {
          return(Object.assign(service, { selected: value }));
        } else {
          return service;
        }
      });
      return {
        barbers: [
          ...state.barbers.slice(0, index),
          Object.assign(barber, { services: services }),
          ...state.barbers.slice(index + 1)
        ]
      };
    case 'REQUEST_BARBERS':
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case 'REFRESH_BARBERS':
      return {
        ...state,
        isRefreshing: true,
        error: false
      };
    case 'BARBERS_LOADED':
      var {barbers, meta} = action.data;
      return {
        ...state,
        isLoading: false,
        error: false,
        barbers: state.barbers.concat(barbers),
        meta: meta
      };
    case 'BARBERS_CACHE_UPDATED':
    case 'BARBERS_REFRESHED':
      var {barbers, meta} = action.data;
      return {
        ...state,
        isRefreshing: false,
        barbers: barbers,
        meta: meta
      };
    case 'REQUEST_BARBERS_ERROR':
    case 'REFRESH_BARBERS_ERROR':
      return {
        ...state,
        isLoading: false,
        isRefreshing: false,
        error: true
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = barbers;
