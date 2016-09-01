import api from '../api';

function listCities(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_CITIES' });

    api.get('/customer/cities', { params: data, headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'CITIES_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_CITIES_ERROR', data: error.data }));
  }
}

function selectCity(city) {
  return {
    type: 'SELECT_CITY',
    data: {
      city
    }
  };
}

function updateQuery(query) {
  return {
    type: 'CHANGE_CITY_QUERY',
    data: {
      query
    }
  };
}

export {listCities, selectCity, updateQuery};
