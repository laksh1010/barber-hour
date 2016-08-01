import formStyle from '../forms/style';

const initialState = {
  isLoading: false,
  success: false,
  auto: 'none',
  fields: {
    phone: {
      placeholder: 'número de celular',
      keyboardType: 'numeric',
      error: 'digite o número de celular',
      stylesheet: formStyle,
      help: 'digite somente números, incluindo o DDD'
    }
  },
  phone: null
};

function startPhoneVerification(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_PHONE_VERIFICATION_ERROR':
      return {
        ...state,
        isLoading: false,
        fields: {
          phone: {
            ...state.fields.phone,
            hasError: true,
            editable: true,
            error: 'número inválido'
          }
        }
      };
    case 'REQUEST_START_PHONE_VERIFICATION':
      return {
        ...initialState,
        isLoading: true,
        fields: {
          phone: {
            ...state.fields.phone,
            editable: false
          }
        },
        phone: action.data.phone
      };
    case 'PHONE_VERIFICATION_SENT':
      return {
        ...state,
        isLoading: false,
        success: true
      };
    default:
      return state;
  }
}

module.exports = startPhoneVerification;
