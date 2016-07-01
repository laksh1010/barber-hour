import formStyle from '../forms/style';

const initialState = {
  isLoading: false,
  success: false,
  auto: 'none',
  fields: {
    verification_code: {
      placeholder: 'código de verificação',
      keyboardType: 'numeric',
      error: 'digite o código de verificação',
      stylesheet: formStyle
    }
  },
  verification_code: null
};

function verifyPhone(state = initialState, action) {
  switch (action.type) {
    case 'PHONE_VERIFICATION_ERROR':
      return {
        ...state,
        isLoading: false,
        fields: {
          verification_code: {
            ...state.fields.verification_code,
            hasError: true,
            error: 'código inválido'
          }
        }
      };
    case 'REQUEST_VERIFY_PHONE':
      return {
        ...initialState,
        isLoading: true,
        verification_code: action.data.verification_code
      };
    case 'PHONE_VERIFIED':
      return {
        ...initialState,
        success: true
      };
    default:
      return state;
  }
}

module.exports = verifyPhone;
