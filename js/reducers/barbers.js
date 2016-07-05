const initialState = {
  isLoading: false,
  error: false,
  barbers: []
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
    case 'BARBERS_LOADED':
      var {barbers} = action.data;
      return {
        ...state,
        isLoading: false,
        error: false,
        barbers: barbers
      };
    case 'REQUEST_BARBERS_ERROR':
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
}

module.exports = barbers;
