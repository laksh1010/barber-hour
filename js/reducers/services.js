const initialState = {
  isLoading: false,
  success: false,
  services: [
    {id: 1, name: 'Corte de Cabelo', selected: false, price: null},
    {id: 2, name: 'Corte de Barba', selected: false, price: null}
  ]
};

function services(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SERVICE':
      var {serviceID, value} = action.data;
      var index = state.services.findIndex(service => service.id === serviceID);
      var service = state.services.find(service => service.id === serviceID);
      return {
        ...state,
        services: [
          ...state.services.slice(0, index),
          Object.assign(service, { selected: value }),
          ...state.services.slice(index + 1)
        ]
      };
    case 'CHANGE_SERVICE_PRICE':
      var {serviceID, price} = action.data;
      var index = state.services.findIndex(service => service.id === serviceID);
      var service = state.services.find(service => service.id === serviceID);
      return {
        ...state,
        services: [
          ...state.services.slice(0, index),
          Object.assign(service, { price: price }),
          ...state.services.slice(index + 1)
        ]
      };
    case 'INVALID_SERVICES':
      return state;
    case 'REQUEST_SERVICES':
      return {
        ...initialState,
        isLoading: true
      };
    case 'SERVICES_CREATED':
      return {
        ...initialState,
        success: true
      };
    default:
      return state;
  }
}

module.exports = services;
