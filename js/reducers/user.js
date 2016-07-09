const initialState = {
  isLoggedIn: false,
  isLoading: false,
  error: false,
  name: null,
  email: null,
  token: null,
  type: null,
  signupStep: null
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
        token,
        signupStep: 'AccountTypeSelector'
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
        type,
        signupStep: (type === 'Barber' ? 'AddressForm' : 'PhoneForm')
      };
    case 'PHONE_VERIFICATION_SENT':
      return {
        ...state,
        signupStep: 'VerifyPhone'
      };
    case 'PHONE_VERIFIED':
    case 'ACCOUNT_REVIEWED':
      return {
        ...state,
        signupStep: null
      };
    case 'ADDRESS_CREATED':
      return {
        ...state,
        signupStep: (state.signupStep ? 'ServicesForm' : null)
      };
    case 'SERVICES_CREATED':
      return {
        ...state,
        signupStep: (state.signupStep ? 'ImageChooser' : null)
      };
    case 'IMAGES_CREATED':
      return {
        ...state,
        signupStep: (state.signupStep ? 'ScheduleBuilder' : null)
      };
    case 'SCHEDULE_TEMPLATES_CREATED':
      return {
        ...state,
        signupStep: (state.signupStep ? 'WaitReview' : null)
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
