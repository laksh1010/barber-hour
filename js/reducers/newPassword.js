import formStyle from '../forms/style';

const initialState = {
  isLoading: false,
  success: false,
  auto: 'none',
  fields: {
    password: {
      placeholder: 'nova senha',
      secureTextEntry: true,
      maxLength: 72,
      error: 'deve ter pelo menos 8 caracteres',
      stylesheet: formStyle
    },
    password_confirmation: {
      placeholder: 'confirme a nova senha',
      secureTextEntry: true,
      maxLength: 72,
      error: 'deve ter pelo menos 8 caracteres',
      stylesheet: formStyle
    }
  }
};

function password(state = initialState, action) {
  switch (action.type) {
    case 'INVALID_NEW_PASSWORD':
      var {password, password_confirmation, reset_password_token} = action.data;
      var passwordError = !!password ? password[0] : state.fields.password.error;
      var passwordConfirmationError = !!password_confirmation ? password_confirmation[0] : state.fields.password_confirmation.error;
      var resetPasswordTokenError = !!reset_password_token ? reset_password_token[0] : passwordConfirmationError;

      return {
        ...state,
        isLoading: false,
        fields: {
          password: {
            ...state.fields.password,
            hasError: !!password,
            error: passwordError,
            editable: true
          },
          password_confirmation: {
            ...state.fields.password_confirmation,
            hasError: !!password_confirmation || !!reset_password_token,
            error: resetPasswordTokenError,
            editable: true
          }
        }
      };
    case 'REQUEST_NEW_PASSWORD':
      return {
        ...initialState,
        isLoading: true,
        fields: {
          password: {
            ...state.fields.password,
            editable: false
          },
          password_confirmation: {
            ...state.fields.password_confirmation,
            editable: false
          }
        },
        password: action.data.password,
        password_confirmation: action.data.password_confirmation
      };
    case 'NEW_PASSWORD_CREATED':
      return {
        ...initialState,
        success: true
      };
    default:
      return state;
  }
}

module.exports = password;
