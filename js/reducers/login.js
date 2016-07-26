import formStyle from '../forms/style';

const initialState = {
  isLoading: false,
  auto: 'none',
  fields: {
    email: {
      autoCapitalize: 'none',
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
    }
  },
  email: null,
  password: null
};

function login(state = initialState, action) {
  switch (action.type) {
    case 'INVALID_LOGIN':
      return {
        ...state,
        isLoading: false,
        fields: {
          email: {
            ...state.fields.email,
            editable: true
          },
          password: {
            ...state.fields.password,
            hasError: true,
            editable: true,
            error: 'e-mail e/ou senha incorretos'
          }
        }
      };
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        fields: {
          email: {
            ...state.fields.email,
            editable: false
          },
          password: {
            ...state.fields.password,
            editable: false
          }
        },
        isLoading: true,
        email: action.data.email,
        password: action.data.password
      };
    case 'LOGGED_IN':
      return initialState;
    default:
      return state;
  }
}

module.exports = login;
