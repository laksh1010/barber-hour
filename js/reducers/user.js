const initialState = {
  isLoggedIn: false,
  isLoading: false,
  error: false,
  name: null,
  email: null,
  token: null,
  type: null
};

function user(state = initialState, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      var {name, email, token, type} = action.data.user;
      return {
        isLoggedIn: true,
        isLoading: false,
        name,
        email,
        token,
        type
      };
    case 'LOGGED_OUT':
      return initialState;
    case 'SIGNED_UP':
      var {name, email, token} = action.data.user;
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        name,
        email,
        token
      };
    case 'REQUEST_CHOOSE_TYPE':
      var {type} = action.data;
      return {
        ...state,
        isLoading: true,
        error: false,
        type
      };
    case 'TYPE_CHOOSEN':
      var {type} = action.data.user;
      return {
        ...state,
        isLoading: false,
        error: false,
        type
      };
    case 'ADD_ACCOUNT_ERROR':
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
}

module.exports = user;
