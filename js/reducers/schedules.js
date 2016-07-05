const initialState = {
  isLoading: false,
  error: false,
  days: []
};

function schedules(state = initialState, action) {
  switch (action.type) {
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
          schedules: daySchedules
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
