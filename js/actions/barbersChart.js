import api from '../api';

function listCities(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_ADMIN_CITIES' });

    api.get('/admin/cities/search', { params: data, headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'ADMIN_CITIES_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_ADMIN_CITIES_ERROR', data: error.data }));
  }
}

function selectCity(city) {
  return {
    type: 'SELECT_ADMIN_CITY',
    data: {
      city
    }
  };
}

function updateCityQuery(cityQuery) {
  return {
    type: 'CHANGE_ADMIN_CITY_QUERY',
    data: {
      cityQuery
    }
  };
}

function listBarbers(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_ADMIN_BARBERS' });

    api.get('/admin/barbers/search', { params: data, headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'ADMIN_BARBERS_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_ADMIN_BARBERS_ERROR', data: error.data }));
  }
}

function selectBarber(barber) {
  return {
    type: 'SELECT_ADMIN_BARBER',
    data: {
      barber
    }
  };
}

function updateBarberQuery(barberQuery) {
  return {
    type: 'CHANGE_ADMIN_BARBER_QUERY',
    data: {
      barberQuery
    }
  };
}

function toggleStatus(name, value) {
  return {
    type: 'TOGGLE_ADMIN_STATUS',
    data: {
      name,
      value
    }
  };
}

function changePeriod(name, value) {
  return {
    type: 'CHANGE_ADMIN_PERIOD',
    data: {
      name,
      value
    }
  };
}

function getChart() {
  return (dispatch, getState) => {
    var state = getState();

    var data = {
      from_date: state.barbersChart.period.fromDate,
      to_date: state.barbersChart.period.toDate,
      barber_id: state.barbersChart.selectedBarber && state.barbersChart.selectedBarber.id,
      city_id: state.barbersChart.selectedCity && state.barbersChart.selectedCity.id
    };

    dispatch({ type: 'REQUEST_ADMIN_BARBERS_CHART' });

    api.get('/admin/barbers/chart', { params: data, headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'ADMIN_BARBERS_CHART_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_ADMIN_BARBERS_CHART_ERROR', data: error.data }));
  }
}

function resetFilters() {
  return {
    type: 'RESET_ADMIN_BARBERS_CHART_FILTERS'
  };
}

export {
  listCities,
  selectCity,
  updateCityQuery,
  listBarbers,
  selectBarber,
  updateBarberQuery,
  toggleStatus,
  changePeriod,
  getChart,
  resetFilters
};
