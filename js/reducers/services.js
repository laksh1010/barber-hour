const initialState = {
  isLoading: false,
  success: false,
  error: false,
  services: [
    {id: 1, name: 'Corte de Cabelo', selected: false, price: null, error: null},
    {id: 2, name: 'Corte de Barba', selected: false, price: null, error: null}
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
    case 'ADD_SERVICE_ERROR':
      var {serviceID} = action.data;
      var index = state.services.findIndex(service => service.id === serviceID);
      var service = state.services.find(service => service.id === serviceID);
      return {
        ...state,
        services: [
          ...state.services.slice(0, index),
          Object.assign(service, { error: 'digite o preço' }),
          ...state.services.slice(index + 1)
        ]
      };
    case 'ADD_SERVICES_ERROR':
      return {
        ...state,
        error: true
      };
    case 'INVALID_SERVICES':
      return {
        ...state,
        isLoading: false,
        success: false
      };
    case 'REQUEST_SERVICES':
      return {
        ...state,
        isLoading: true,
        error: false,
        services: [
          Object.assign(state.services[0], { error: null }),
          Object.assign(state.services[1], { error: null })
        ]
      };
    case 'SERVICES_CREATED':
      return {
        ...state,
        isLoading: false,
        error: false,
        success: true
      };
    case 'SET_EDIT_MODE':
      return {
        ...state,
        success: false
      };
    default:
      return state;
  }
}

module.exports = services;
