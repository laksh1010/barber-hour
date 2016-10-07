const initialState = {
  cities: [],
  isLoading: false,
  error: false,
  query: ''
};

function cities(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_CITIES':
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case 'CITIES_LOADED':
      var {cities} = action.data;
      return {
        ...state,
        isLoading: false,
        cities: cities
      };
    case 'REQUEST_CITIES_ERROR':
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case 'CHANGE_CITY_QUERY':
      var {query} = action.data;
      return {
        ...state,
        query
      };
    case 'SELECT_CITY':
      var query = `${action.data.city.name} - ${action.data.city.state.initials}`;
      return {
        ...state,
        query
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = cities;
