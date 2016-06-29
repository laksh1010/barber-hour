const initialState = {
  isLoggedIn: false,
  id: null,
  name: null,
  email: null,
  provider: null
};

function user(state = initialState, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      let {id, name, email, provider} = action.data;
      return {
        isLoggedIn: true,
        id,
        name,
        email,
        provider
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = user;
