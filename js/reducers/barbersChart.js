const initialState = {
  cities: [],
  barbers: [],
  isLoading: false,
  error: false,
  barberQuery: '',
  cityQuery: '',
  selectedCity: null,
  selectedBarber: null,
  period: {
    fromDate: null,
    toDate: null
  },
  statuses: [
    { name: 'scheduled', selected: true, translated_name: 'agendados' },
    { name: 'finished', selected: true, translated_name: 'finalizados' },
    { name: 'canceled', selected: true, translated_name: 'cancelados' }
  ],
  chartData: []
};

function barbersChart(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ADMIN_CITIES':
    case 'REQUEST_ADMIN_BARBERS':
    case 'REQUEST_ADMIN_BARBERS_CHART':
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case 'ADMIN_CITIES_LOADED':
      var {cities} = action.data;
      return {
        ...state,
        isLoading: false,
        cities: cities
      };
    case 'ADMIN_BARBERS_LOADED':
      var {barbers} = action.data;
      return {
        ...state,
        isLoading: false,
        barbers: barbers
      };
    case 'ADMIN_BARBERS_CHART_LOADED':
      var chartData = action.data.barber_charts || [];
      return {
        ...state,
        isLoading: false,
        chartData: chartData
      };
    case 'REQUEST_ADMIN_CITIES_ERROR':
    case 'REQUEST_ADMIN_BARBERS_ERROR':
    case 'REQUEST_ADMIN_BARBERS_CHART_ERROR':
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case 'CHANGE_ADMIN_CITY_QUERY':
      var {cityQuery} = action.data;
      return {
        ...state,
        cityQuery
      };
    case 'CHANGE_ADMIN_BARBER_QUERY':
      var {barberQuery} = action.data;
      return {
        ...state,
        barberQuery
      };
    case 'SELECT_ADMIN_CITY':
      var {city} = action.data;
      var cityQuery = `${city.name} - ${city.state.initials}`;
      return {
        ...state,
        cityQuery,
        selectedCity: city,
        cities: []
      };
    case 'SELECT_ADMIN_BARBER':
      var {barber} = action.data;
      var barberQuery = barber.name;
      return {
        ...state,
        barberQuery,
        selectedBarber: barber,
        barbers: []
      };
    case 'TOGGLE_ADMIN_STATUS':
      var {name, value} = action.data;
      var index = state.statuses.findIndex(status => status.name === name);
      var status = state.statuses.find(status => status.name === name);
      return {
        ...state,
        statuses: [
          ...state.statuses.slice(0, index),
          Object.assign(status, { selected: value }),
          ...state.statuses.slice(index + 1)
        ]
      };
    case 'CHANGE_ADMIN_PERIOD':
      var {name, value} = action.data;
      return {
        ...state,
        period: {
          ...state.period,
          [name]: value
        }
      };
    case 'RESET_ADMIN_BARBERS_CHART_FILTERS':
      return {
        ...initialState,
        chartData: state.chartData
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = barbersChart;
