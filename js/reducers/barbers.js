const initialState = {
  isLoading: false,
  error: false,
  barbers: []
};

function barbers(state = initialState, action) {
  switch (action.type) {
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
