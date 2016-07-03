import api from '../api';

function startPhoneVerification(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_START_PHONE_VERIFICATION', data: data });

    api.post('/customer/verify_phone', data, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'PHONE_VERIFICATION_SENT', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_PHONE_VERIFICATION_ERROR', data: error.data }));
  }
}

function verifyPhone(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_VERIFY_PHONE', data: data });

    api.get('/customer/verify_phone', { params: data, headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'PHONE_VERIFIED', data: response.data }))
      .catch(error => dispatch({ type: 'PHONE_VERIFICATION_ERROR', data: error.data }));
  }
}

export {startPhoneVerification, verifyPhone};
