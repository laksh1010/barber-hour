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
    case 'REQUEST_TOGGLE_SCHEDULE_ACTIVE':
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case 'SCHEDULES_LOADED':
      var {schedules} = action.data;
      var newDays = [];

      if (schedules.length) {
        firstEnabledSchedule = schedules.filter(schedule => !schedule.disabled)[0];
        selectedDayNumber = firstEnabledSchedule ? firstEnabledSchedule.day_number : schedules[0].day_number;

        dayNumbers = schedules.map(schedule => schedule.day_number);
        uniqueDayNumbers = [];
        dayNumbers.map(dayNumber => {
          if (uniqueDayNumbers.indexOf(dayNumber) === -1) {
            uniqueDayNumbers.push(dayNumber);
          }
        });

        newDays = uniqueDayNumbers.map(dayNumber => {
          var daySchedules = schedules.reduce((memo, item) => {
            if (item.day_number === dayNumber) {
              memo.push(item);
            }

            return memo;
          }, []);

          return {
            number: dayNumber,
            schedules: daySchedules,
            selected: dayNumber === selectedDayNumber
          };
        });
      }

      return {
        ...state,
        isLoading: false,
        error: false,
        days: newDays
      };
    case 'SCHEDULE_ACTIVE_TOGGLED':
      const {schedule} = action.data;
      var day = state.days.find(day => day.number === schedule.day_number);
      var dayIndex = state.days.findIndex(day => day.number === schedule.day_number);
      var scheduleIndex = day.schedules.findIndex(s => s.id === schedule.id);
      var schedules = [
        ...day.schedules.slice(0, scheduleIndex),
        schedule,
        ...day.schedules.slice(scheduleIndex + 1)
      ];

      return {
        ...state,
        isLoading: false,
        error: false,
        days: [
          ...state.days.slice(0, dayIndex),
          Object.assign(day, { schedules: schedules }),
          ...state.days.slice(dayIndex + 1)
        ]
      };
    case 'REQUEST_SCHEDULES_ERROR':
    case 'REQUEST_TOGGLE_SCHEDULE_ACTIVE_ERROR':
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case 'APPOINTMENT_CANCELED':
    case 'APPOINTMENT_FINISHED':
      var {appointment} = action.data;

      if (appointment.schedule && state.days.length) {
        var day = state.days.find(day => day.number === appointment.schedule.day_number);
        var dayIndex = state.days.findIndex(day => day.number === appointment.schedule.day_number);
        var scheduleIndex = day.schedules.findIndex(s => s.id === appointment.schedule.id);
        var schedules = [
          ...day.schedules.slice(0, scheduleIndex),
          appointment.schedule,
          ...day.schedules.slice(scheduleIndex + 1)
        ];

        return {
          ...state,
          isLoading: false,
          error: false,
          days: [
            ...state.days.slice(0, dayIndex),
            Object.assign(day, { schedules: schedules }),
            ...state.days.slice(dayIndex + 1)
          ]
        };
      } else {
        return state;
      }
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = schedules;
