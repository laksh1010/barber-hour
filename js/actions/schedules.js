import api from '../api';

function listSchedules(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_SCHEDULES' });

    api.get(`/customer/barbers/${data.id}/schedules`, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'SCHEDULES_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_SCHEDULES_ERROR', data: error.data }));
  }
}

function selectDay(index) {
  return {
    type: 'SELECT_DAY',
    data: {
      index,
    }
  };
}

function selectSchedule(schedule) {
  return {
    type: 'SELECT_SCHEDULE',
    data: {
      schedule,
    }
  };
}

export {listSchedules, selectDay, selectSchedule};
