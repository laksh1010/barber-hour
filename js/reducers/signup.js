import formStyle from '../forms/style';

const initialState = {
  isLoading: false,
  auto: 'none',
  fields: {
    name: {
      placeholder: 'nome',
      error: 'digite o nome',
      stylesheet: formStyle
    },
    email: {
      placeholder: 'e-mail',
      keyboardType: 'email-address',
      error: 'e-mail inválido',
      stylesheet: formStyle
    },
    password: {
      placeholder: 'senha',
      secureTextEntry: true,
      maxLength: 72,
      error: 'deve ter pelo menos 8 caracteres',
      stylesheet: formStyle
    },
    password_confirmation: {
      placeholder: 'confirme a senha',
      secureTextEntry: true,
      maxLength: 72,
      error: 'deve ter pelo menos 8 caracteres',
      stylesheet: formStyle
    }
  }
};

function signup(state = initialState, action) {
  switch (action.type) {
    case 'INVALID_SIGNUP':
      var {name, email, password, password_confirmation} = action.data;
      var nameError = !!name ? name[0] : state.fields.name.error;
      var emailError = !!email ? email[0] : state.fields.email.error;
      var passwordError = !!password ? password[0] : state.fields.password.error;
      var passwordConfirmationError = !!password_confirmation ? password_confirmation[0] : state.fields.password_confirmation.error;

      return {
        ...state,
        isLoading: false,
        fields: {
          name: {
            ...state.fields.name,
            hasError: !!name,
            error: nameError
          },
          email: {
            ...state.fields.email,
            hasError: !!email,
            error: emailError
          },
          password: {
            ...state.fields.password,
            hasError: !!password,
            error: passwordError
          },
          password_confirmation: {
            ...state.fields.password_confirmation,
            hasError: !!password_confirmation,
            error: passwordConfirmationError
          },
        }
      };
    case 'REQUEST_SIGNUP':
      return {
        ...initialState,
        isLoading: true,
        name: action.data.name,
        email: action.data.email,
        password: action.data.password,
        password_confirmation: action.data.password_confirmation,
      };
    case 'LOGGED_IN':
      return initialState;
    default:
      return state;
  }
}

module.exports = signup;
