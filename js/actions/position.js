import api from '../api';
import Geocoder from 'react-native-geocoder';

function getGeolocation(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_FIND_CITY' });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('position', position)
        Geocoder.geocodePosition({ lat: position.coords.latitude, lng: position.coords.longitude })
          .then(res => {
            console.log('res', res)
            var data = {city_state: res[0].adminArea, city_name: res[0].locality};

            api.get('/customer/city', { params: data, headers: { 'Authorization': `Token ${getState().user.token}` } })
              .then(response => dispatch({ type: 'CITY_FOUND', data: response.data }))
              .catch(error => dispatch({ type: 'REQUEST_FOUND_CITY_ERROR', data: error.data }));
          })
          .catch(err => dispatch({ type: 'REQUEST_FOUND_CITY_ERROR', data: err }));
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
}

export {getGeolocation};
