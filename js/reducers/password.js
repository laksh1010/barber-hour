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
    case 'INVALID_PASSWORD_UPDATE':
      var {password, password_confirmation} = action.data;
      var passwordError = !!password ? password[0] : state.fields.password.error;
      var passwordConfirmationError = !!password_confirmation ? password_confirmation[0] : state.fields.password_confirmation.error;

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
            hasError: !!password_confirmation,
            error: passwordConfirmationError,
            editable: true
          }
        }
      };
    case 'REQUEST_PASSWORD_UPDATE':
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
    case 'PASSWORD_UPDATED':
      return {
        ...initialState,
        success: true,
        fields: {
          password: {
            ...state.fields.password,
            editable: true
          },
          password_confirmation: {
            ...state.fields.password_confirmation,
            editable: true
          }
        }
      };
    default:
      return state;
  }
}

module.exports = password;
