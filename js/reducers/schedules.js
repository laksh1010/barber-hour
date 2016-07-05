const initialState = {
  isLoading: false,
  error: false,
  days: []
};

function schedules(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_DAY':
      var {index} = action.data;
      var days = state.days.map((day) => {
        return(Object.assign(day, { selected: false }));
      });
      const day = state.days[index];
      return {
        ...state,
        days: [
          ...days.slice(0, index),
          Object.assign(day, { selected: true }),
          ...days.slice(index + 1)
        ]
      };
    case 'SELECT_SCHEDULE':
      var {schedule} = action.data;
      var days = state.days.map(day => {
        var schedules = day.schedules.map(s => {
          return(Object.assign(s, { selected: false }));
        })
        return(Object.assign(day, { schedules: schedules }));
      });
      const selectedDay = days.find(day => day.selected);
      const index = days.findIndex(day => day.selected);
      const schedules = selectedDay.schedules.map((s) => {
        return(Object.assign(s, { selected: s.id === schedule.id }));
      });
      return {
        ...state,
        days: [
          ...days.slice(0, index),
          Object.assign(selectedDay, { schedules: schedules }),
          ...days.slice(index + 1)
        ]
      };
    case 'REQUEST_SCHEDULES':
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case 'SCHEDULES_LOADED':
      var {schedules} = action.data;

      dayNumbers = schedules.map(schedule => schedule.day_number);
      uniqueDayNumbers = [];
      dayNumbers.map(dayNumber => {
        if (uniqueDayNumbers.indexOf(dayNumber) === -1) {
          uniqueDayNumbers.push(dayNumber);
        }
      });

      var newDays = uniqueDayNumbers.map(dayNumber => {
        var daySchedules = schedules.reduce((memo, item) => {
          if (item.day_number === dayNumber) {
            memo.push(item);
          }

          return memo;
        }, []);

        return {
          number: dayNumber,
          schedules: daySchedules,
          selected: uniqueDayNumbers.indexOf(dayNumber) === 0
        };
      });

      return {
        ...state,
        isLoading: false,
        error: false,
        days: newDays
      };
    case 'REQUEST_SCHEDULES_ERROR':
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
}

module.exports = schedules;
