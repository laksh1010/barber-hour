import formStyle from '../forms/style';

const initialState = {
  isLoading: false,
  success: false,
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
    }
  }
};

function account(state = initialState, action) {
  switch (action.type) {
    case 'INVALID_ACCOUNT_UPDATE':
      var {name, email} = action.data;
      var nameError = !!name ? name[0] : state.fields.name.error;
      var emailError = !!email ? email[0] : state.fields.email.error;

      return {
        ...state,
        isLoading: false,
        fields: {
          name: {
            ...state.fields.name,
            hasError: !!name,
            error: nameError,
            editable: true
          },
          email: {
            ...state.fields.email,
            hasError: !!email,
            error: emailError,
            editable: true
          }
        }
      };
    case 'REQUEST_ACCOUNT_UPDATE':
      return {
        ...initialState,
        isLoading: true,
        fields: {
          name: {
            ...state.fields.name,
            editable: false
          },
          email: {
            ...state.fields.email,
            editable: false
          }
        },
        name: action.data.name,
        email: action.data.email
      };
    case 'ACCOUNT_UPDATED':
      return {
        ...state,
        isLoading: false,
        success: true,
        fields: {
          name: {
            ...state.fields.name,
            editable: true
          },
          email: {
            ...state.fields.email,
            editable: true
          }
        }
      };
    default:
      return state;
  }
}

module.exports = account;
