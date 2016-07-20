import api from '../api';

function listSchedules(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_SCHEDULES' });

    const url = getState().user.type === 'customer' ? `/customer/barbers/${data.id}/schedules` : 'barber/schedules';

    api.get(url, { headers: { 'Authorization': `Token ${getState().user.token}` } })
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

function toggleActive(scheduleID, data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_TOGGLE_SCHEDULE_ACTIVE' });

    api.patch(`barber/schedules/${scheduleID}`, { schedule: data }, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'SCHEDULE_ACTIVE_TOGGLED', data: response.data }))
      .catch(error => dispatch({ type: 'REQUEST_TOGGLE_SCHEDULE_ACTIVE_ERROR', data: error.data }));
  }
}

export {listSchedules, selectDay, selectSchedule, toggleActive};
