const initialState = {
  isLoading: false,
  isRequestingInfo: false,
  success: false,
  error: false,
  scheduleTemplates: [
    {weekday: 'monday', name: 'Segunda', active: false, opensAt: {value: null, error: null}, closesAt: {value: null, error: null}, lunchStartsAt: {value: null, error: null}, lunchEndsAt: {value: null, error: null}},
    {weekday: 'tuesday', name: 'Terça', active: false, opensAt: {value: null, error: null}, closesAt: {value: null, error: null}, lunchStartsAt: {value: null, error: null}, lunchEndsAt: {value: null, error: null}},
    {weekday: 'wednesday', name: 'Quarta', active: false, opensAt: {value: null, error: null}, closesAt: {value: null, error: null}, lunchStartsAt: {value: null, error: null}, lunchEndsAt: {value: null, error: null}},
    {weekday: 'thursday', name: 'Quinta', active: false, opensAt: {value: null, error: null}, closesAt: {value: null, error: null}, lunchStartsAt: {value: null, error: null}, lunchEndsAt: {value: null, error: null}},
    {weekday: 'friday', name: 'Sexta', active: false, opensAt: {value: null, error: null}, closesAt: {value: null, error: null}, lunchStartsAt: {value: null, error: null}, lunchEndsAt: {value: null, error: null}},
    {weekday: 'saturday', name: 'Sábado', active: false, opensAt: {value: null, error: null}, closesAt: {value: null, error: null}, lunchStartsAt: {value: null, error: null}, lunchEndsAt: {value: null, error: null}},
    {weekday: 'sunday', name: 'Domingo', active: false, opensAt: {value: null, error: null}, closesAt: {value: null, error: null}, lunchStartsAt: {value: null, error: null}, lunchEndsAt: {value: null, error: null}}
  ],
  averageServiceTime: {value: '01:00', error: null}
};

function scheduleTemplates(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SCHEDULE_TEMPLATE':
      var {weekday, value} = action.data;
      var index = state.scheduleTemplates.findIndex(scheduleTemplate => scheduleTemplate.weekday === weekday);
      var scheduleTemplate = state.scheduleTemplates.find(scheduleTemplate => scheduleTemplate.weekday === weekday);
      return {
        ...state,
        scheduleTemplates: [
          ...state.scheduleTemplates.slice(0, index),
          Object.assign(scheduleTemplate, { active: value }),
          ...state.scheduleTemplates.slice(index + 1)
        ]
      };
    case 'CHANGE_SCHEDULE_TEMPLATE_TIME':
      var {weekday, field, time} = action.data;
      var index = state.scheduleTemplates.findIndex(scheduleTemplate => scheduleTemplate.weekday === weekday);
      var scheduleTemplate = state.scheduleTemplates.find(scheduleTemplate => scheduleTemplate.weekday === weekday);
      scheduleTemplate[field].value = time;
      scheduleTemplate[field].error = null;
      return {
        ...state,
        scheduleTemplates: [
          ...state.scheduleTemplates.slice(0, index),
          scheduleTemplate,
          ...state.scheduleTemplates.slice(index + 1)
        ]
      };
    case 'CHANGE_AVERAGE_SERVICE_TIME':
      return {
        ...state,
        averageServiceTime: { value: action.data.averageServiceTime, error: null }
      };
    case 'ADD_SCHEDULE_TEMPLATES_ERROR':
      return {
        ...state,
        error: true
      };
    case 'INVALID_SCHEDULE_TEMPLATES':
      var {schedule_templates, average_service_time} = action.data;
      var averageServiceTime = !!average_service_time ? { value: state.averageServiceTime.value, error: average_service_time[0] } : state.averageServiceTime;

      if (schedule_templates) {
        var scheduleTemplates = state.scheduleTemplates.map((scheduleTemplate, index) => {
          var error = schedule_templates[index];
          var opensAt = !!error && !!error.opens_at ? { value: scheduleTemplate.opensAt.value, error: error.opens_at[0] } : scheduleTemplate.opensAt;
          var closesAt = !!error && !!error.closes_at ? { value: scheduleTemplate.closesAt.value, error: error.closes_at[0] } : scheduleTemplate.closesAt;
          var lunchStartsAt = !!error && !!error.lunch_starts_at ? { value: scheduleTemplate.lunchStartsAt.value, error: error.lunch_starts_at[0] } : scheduleTemplate.lunchStartsAt;
          var lunchEndsAt = !!error && !!error.lunch_ends_at ? { value: scheduleTemplate.lunchEndsAt.value, error: error.lunch_ends_at[0] } : scheduleTemplate.lunchEndsAt;
          return Object.assign(scheduleTemplate, { opensAt, closesAt, lunchStartsAt, lunchEndsAt });
        });
      }

      return {
        ...state,
        isLoading: false,
        success: false,
        scheduleTemplates: scheduleTemplates || state.scheduleTemplates,
        averageServiceTime: averageServiceTime
      };
    case 'REQUEST_SCHEDULE_TEMPLATES':
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case 'SCHEDULE_TEMPLATES_CREATED':
      var response = action.data.schedule_templates;
      var scheduleTemplates = state.scheduleTemplates.map(scheduleTemplate => {
        var newScheduleTemplate = response.find(s => s.weekday === scheduleTemplate.weekday);
        return Object.assign(scheduleTemplate, newScheduleTemplate);
      });
      return {
        ...initialState,
        success: true,
        scheduleTemplates: scheduleTemplates
      };
    case 'REQUEST_LOAD_SCHEDULE_TEMPLATES':
      return {
        ...state,
        success: false,
        isRequestingInfo: true
      };
    case 'SCHEDULE_TEMPLATES_LOADED':
      var {schedule_templates, average_service_time} = action.data;
      var averageServiceTime = { value: average_service_time, error: null };
      var scheduleTemplates = state.scheduleTemplates.map(scheduleTemplate => {
        var newScheduleTemplate = schedule_templates.find(s => s.weekday === scheduleTemplate.weekday);
        return Object.assign(scheduleTemplate, {
          id: newScheduleTemplate.id,
          opensAt: { value: newScheduleTemplate.opens_at, error: null },
          closesAt: { value: newScheduleTemplate.closes_at, error: null },
          lunchStartsAt: { value: newScheduleTemplate.lunch_starts_at, error: null },
          lunchEndsAt: { value: newScheduleTemplate.lunch_ends_at, error: null },
          active: newScheduleTemplate.active
        });
      });
      return {
        ...state,
        isRequestingInfo: false,
        scheduleTemplates: scheduleTemplates,
        averageServiceTime: averageServiceTime
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = scheduleTemplates;
