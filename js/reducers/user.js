const initialState = {
  isLoggedIn: false,
  name: null,
  email: null,
  token: null
};

function user(state = initialState, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      var {name, email, token} = action.data.user;
      return {
        isLoggedIn: true,
        isLoading: false,
        name,
        email,
        token
      };
    case 'LOGGED_OUT':
      return initialState;
    case 'INVALID_LOGIN':
      if (action.status === 401) {
        return {
          ...state,
          isLoading: false,
          invalidLogin: true
        };
      } else {
        return state;
      }
    case 'REQUEST_LOGIN':
      return {
        ...state,
        isLoading: true,
        email: action.data.email,
        password: action.data.password
      };
    case 'REQUEST_SIGNUP':
      return {
        ...state,
        isLoading: true,
        name: action.data.name,
        email: action.data.email,
        password: action.data.password,
        password_confirmation: action.data.password_confirmation,
      };
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
    default:
      return state;
  }
}

module.exports = user;
