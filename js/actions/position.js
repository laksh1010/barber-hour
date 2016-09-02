import api from '../api';
import Geocoder from 'react-native-geocoder';

function getGeolocation(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_FIND_CITY' });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        Geocoder.geocodePosition({ lat: position.coords.latitude, lng: position.coords.longitude })
          .then(res => {
            var data = {city_state: res[0].adminArea, city_name: res[0].locality};

            api.get('/customer/city', { params: data, headers: { 'Authorization': `Token ${getState().user.token}` } })
              .then(response => dispatch({ type: 'CITY_FOUND', data: response.data }))
              .catch(error => dispatch({ type: 'REQUEST_FOUND_CITY_ERROR', data: error.data }));
          })
          .catch(err => dispatch({ type: 'REQUEST_FOUND_CITY_ERROR', data: err }));
      },
      (error) => dispatch({ type: 'REQUEST_FOUND_CITY_ERROR', data: error }),
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000}
    );
  }
}

export {getGeolocation};
