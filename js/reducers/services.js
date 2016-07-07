const initialState = {
  isLoading: false,
  isRequestingInfo: false,
  success: false,
  error: false,
  services: [
    {name: 'Corte de Cabelo', selected: false, price: null, error: null},
    {name: 'Corte de Barba', selected: false, price: null, error: null}
  ]
};

function services(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SERVICE':
      var {name, value} = action.data;
      var index = state.services.findIndex(service => service.name === name);
      var service = state.services.find(service => service.name === name);
      return {
        ...state,
        services: [
          ...state.services.slice(0, index),
          Object.assign(service, { selected: value }),
          ...state.services.slice(index + 1)
        ]
      };
    case 'CHANGE_SERVICE_PRICE':
      var {name, price} = action.data;
      var index = state.services.findIndex(service => service.name === name);
      var service = state.services.find(service => service.name === name);
      return {
        ...state,
        services: [
          ...state.services.slice(0, index),
          Object.assign(service, { price: price, error: null }),
          ...state.services.slice(index + 1)
        ]
      };
    case 'ADD_SERVICES_ERROR':
      return {
        ...state,
        error: true
      };
    case 'INVALID_SERVICES':
      var {services} = action.data;

      if (services) {
        var newServices = state.services.map((service, index) => {
          var error = services[index];
          var priceError = !!error && !!error.price ? error.price[0] : null;
          return Object.assign(scheduleTemplate, { error: priceError });
        });
      }

      return {
        ...state,
        isLoading: false,
        success: false,
        services: newServices || state.services,
      };
    case 'REQUEST_SERVICES':
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case 'SERVICES_CREATED':
      var response = action.data.services;
      var services = state.services.map(service => {
        var newService = response.find(s => s.name === service.name);
        if (!newService) {
          newService = { id: null };
        }
        return Object.assign(service, newService);
      });

      return {
        ...initialState,
        success: true,
        services: services
      };
    case 'REQUEST_LOAD_SERVICES':
      return {
        ...state,
        isRequestingInfo: true,
        success: false
      };
    case 'SERVICES_LOADED':
      var response = action.data.services;
      var services = state.services.map(service => {
        var newService = response.find(s => s.name === service.name);
        if (newService) {
          newService = Object.assign(newService, { selected: true });
        } else {
          newService = { id: null };
        }
        return Object.assign(service, newService);
      });
      return {
        ...state,
        isRequestingInfo: false,
        services: services
      };
    default:
      return state;
  }
}

module.exports = services;
