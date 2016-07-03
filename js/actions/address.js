import api from '../api';

function createAddress(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_ADDRESS', data: data });

    api.post('/barber/address', { address: data }, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'ADDRESS_CREATED', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_ADDRESS', data: error.data }));
  }
}

function loadZipcode(zipcode) {
  return (dispatch) => {
    dispatch({ type: 'REQUEST_ADDRESS_INFO', zipcode: zipcode });

    fetch(`https://viacep.com.br/ws/${zipcode}/json/`)
      .then(response => response.json())
      .then(response => dispatch({ type: 'ZIPCODE_LOADED', data: response }));
  }
}

function setEditMode() {
  return {
    type: 'SET_ADDRESS_EDIT_MODE'
  };
}

function updateAddress(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_ADDRESS', data: data });

    api.patch('/barber/address', { address: data }, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'ADDRESS_CREATED', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_ADDRESS', data: error.data }));
  }
}

export {createAddress, loadZipcode, setEditMode, updateAddress};
