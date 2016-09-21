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
      stylesheet: formStyle,
      maxLength: 4
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
            editable: true,
            error: 'código inválido'
          }
        }
      };
    case 'REQUEST_VERIFY_PHONE':
      return {
        ...initialState,
        isLoading: true,
        fields: {
          verification_code: {
            ...state.fields.verification_code,
            editable: false
          }
        },
        verification_code: action.data.verification_code
      };
    case 'PHONE_VERIFIED':
      return {
        ...initialState,
        success: true
      };
    case 'REQUEST_START_PHONE_VERIFICATION':
      return {
        ...state,
        isResequestingCode: true
      };
    case 'PHONE_VERIFICATION_SENT':
      return {
        ...state,
        isResequestingCode: false
      };
    default:
      return state;
  }
}

module.exports = verifyPhone;
