import formStyle from '../forms/style';
import addressForm from '../forms/Address';

const initialState = {
  isLoading: false,
  isRequestingInfo: false,
  success: false,
  auto: 'none',
  fields: {
    zipcode: {
      placeholder: 'CEP',
      keyboardType: 'numeric',
      error: 'digite o CEP',
      stylesheet: formStyle,
      help: 'digite somente números',
      maxLength: 9
    },
    street: {
      placeholder: 'rua',
      error: 'digite a rua',
      stylesheet: formStyle,
      maxLength: 200
    },
    district: {
      placeholder: 'bairro',
      error: 'digite o bairro',
      stylesheet: formStyle,
      maxLength: 200
    },
    number: {
      placeholder: 'número',
      keyboardType: 'numeric',
      error: 'digite o número',
      stylesheet: formStyle,
      maxLength: 10
    },
    city: {
      placeholder: 'cidade',
      error: 'digite a cidade',
      stylesheet: formStyle,
      maxLength: 200
    },
    state: {
      placeholder: 'estado',
      error: 'digite o estado',
      stylesheet: formStyle,
      maxLength: 2
    },
  },
  template: addressForm,
  zipcode: null,
  street: null,
  district: null,
  number: null,
  city: null,
  state: null
};

function address(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ADDRESS_INFO':
      return {
        ...state,
        isRequestingInfo: true,
        fields: {
          zipcode: {
            ...state.fields.zipcode,
            editable: false
          },
          street: {
            ...state.fields.street,
            editable: false
          },
          district: {
            ...state.fields.district,
            editable: false
          },
          number: {
            ...state.fields.number,
            editable: false
          },
          city: {
            ...state.fields.city,
            editable: false
          },
          state: {
            ...state.fields.state,
            editable: false
          },
        },
        zipcode: action.zipcode
      };
    case 'ZIPCODE_LOADED':
      return {
        ...state,
        isRequestingInfo: false,
        fields: {
          zipcode: {
            ...state.fields.zipcode,
            editable: true
          },
          street: {
            ...state.fields.street,
            editable: true
          },
          district: {
            ...state.fields.district,
            editable: true
          },
          number: {
            ...state.fields.number,
            editable: true
          },
          city: {
            ...state.fields.city,
            editable: true
          },
          state: {
            ...state.fields.state,
            editable: true
          },
        },
        street: action.data.logradouro,
        district: action.data.bairro,
        city: action.data.localidade.replace('Birigüi', 'Birigui'),
        state: action.data.uf
      };
    case 'INVALID_ADDRESS':
      var {zipcode, street, district, number} = action.data;
      var zipcodeError = !!zipcode ? zipcode[0] : state.fields.zipcode.error;
      var streetError = !!street ? street[0] : state.fields.street.error;
      var districtError = !!district ? district[0] : state.fields.district.error;
      var numberError = !!number ? number[0] : state.fields.number.error;
      var cityError = !!city ? city[0] : state.fields.city.error;
      var stateError = !!state ? state[0] : state.fields.state.error;

      return {
        ...state,
        isLoading: false,
        fields: {
          zipcode: {
            ...state.fields.zipcode,
            hasError: !!zipcode,
            error: zipcodeError,
            editable: true
          },
          street: {
            ...state.fields.street,
            hasError: !!street,
            error: streetError,
            editable: true
          },
          district: {
            ...state.fields.district,
            hasError: !!district,
            error: districtError,
            editable: true
          },
          number: {
            ...state.fields.number,
            hasError: !!number,
            error: numberError,
            editable: true
          },
          city: {
            ...state.fields.city,
            hasError: !!city,
            error: cityError,
            editable: true
          },
          state: {
            ...state.fields.state,
            hasError: !!state,
            error: stateError,
            editable: true
          },
        }
      };
    case 'REQUEST_ADDRESS':
      return {
        ...initialState,
        isLoading: true,
        fields: {
          zipcode: {
            ...state.fields.zipcode,
            editable: false
          },
          street: {
            ...state.fields.street,
            editable: false
          },
          district: {
            ...state.fields.district,
            editable: false
          },
          number: {
            ...state.fields.number,
            editable: false
          },
          city: {
            ...state.fields.city,
            editable: false
          },
          state: {
            ...state.fields.state,
            editable: false
          },
        },
        zipcode: action.data.zipcode,
        street: action.data.street,
        district: action.data.district,
        number: action.data.number,
        city: action.data.city,
        state: action.data.state
      };
    case 'ADDRESS_CREATED':
      return {
        ...initialState,
        isLoading: false,
        success: true
      };
    case 'REQUEST_LOAD_ADDRESS':
      return {
        ...state,
        success: false,
        isRequestingInfo: true,
        fields: {
          zipcode: {
            ...state.fields.zipcode,
            editable: false
          },
          street: {
            ...state.fields.street,
            editable: false
          },
          district: {
            ...state.fields.district,
            editable: false
          },
          number: {
            ...state.fields.number,
            editable: false
          },
          city: {
            ...state.fields.city,
            editable: false
          },
          state: {
            ...state.fields.state,
            editable: false
          }
        }
      };
    case 'ADDRESS_LOADED':
      var {address} = action.data;
      return {
        ...state,
        isRequestingInfo: false,
        fields: {
          zipcode: {
            ...state.fields.zipcode,
            editable: true
          },
          street: {
            ...state.fields.street,
            editable: true
          },
          district: {
            ...state.fields.district,
            editable: true
          },
          number: {
            ...state.fields.number,
            editable: true
          },
          city: {
            ...state.fields.city,
            editable: true
          },
          state: {
            ...state.fields.state,
            editable: true
          }
        },
        zipcode: address.zipcode,
        street: address.street,
        district: address.district,
        number: address.number,
        city: address.city,
        state: address.state
      };
    default:
      return state;
  }
}

module.exports = address;
