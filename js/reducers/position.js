const initialState = {
  isLoading: false,
  error: false,
};

function position(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_FIND_CITY':
      return {
        isLoading: true,
        error: false
      };
    case 'CITY_FOUND':
      return {
        isLoading: false,
        error: false
      };
    case 'REQUEST_FOUND_CITY_ERROR':
      return {
        isLoading: false,
        error: true
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = position;
