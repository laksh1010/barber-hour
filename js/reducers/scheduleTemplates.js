const initialState = {
  isLoading: false,
  success: false,
  error: false,
  scheduleTemplates: [
    {weekday: 'monday', name: 'Segunda', active: false, opensAt: {value: null, error: null}, closesAt: {value: null, error: null}},
    {weekday: 'tuesday', name: 'Terça', active: false, opensAt: {value: null, error: null}, closesAt: {value: null, error: null}},
    {weekday: 'wednesday', name: 'Quarta', active: false, opensAt: {value: null, error: null}, closesAt: {value: null, error: null}},
    {weekday: 'thursday', name: 'Quinta', active: false, opensAt: {value: null, error: null}, closesAt: {value: null, error: null}},
    {weekday: 'friday', name: 'Sexta', active: false, opensAt: {value: null, error: null}, closesAt: {value: null, error: null}},
    {weekday: 'saturday', name: 'Sábado', active: false, opensAt: {value: null, error: null}, closesAt: {value: null, error: null}},
    {weekday: 'sunday', name: 'Domingo', active: false, opensAt: {value: null, error: null}, closesAt: {value: null, error: null}}
  ],
  serviceDuration: {value: '1:00', error: null}
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
    case 'CHANGE_SERVICE_DURATION':
      return {
        ...state,
        serviceDuration: { value: action.data.serviceDuration, error: null }
      };
    case 'ADD_SCHEDULE_TEMPLATES_ERROR':
      return {
        ...state,
        error: true
      };
    case 'INVALID_SCHEDULE_TEMPLATES':
      var {schedule_templates, service_duration} = action.data;
      var serviceDuration = !!service_duration ? { value: state.serviceDuration.value, error: service_duration[0] } : state.serviceDuration;

      if (schedule_templates) {
        var scheduleTemplates = state.scheduleTemplates.map((scheduleTemplate, index) => {
          var error = schedule_templates[index];
          var opensAt = !!error && !!error.opens_at ? { value: scheduleTemplate.opensAt.value, error: error.opens_at[0] } : scheduleTemplate.opensAt;
          var closesAt = !!error && !!error.closes_at ? { value: scheduleTemplate.closesAt.value, error: error.closes_at[0] } : scheduleTemplate.closesAt;
          return Object.assign(scheduleTemplate, { opensAt: opensAt, closesAt: closesAt });
        });
      }

      return {
        ...state,
        isLoading: false,
        success: false,
        scheduleTemplates: scheduleTemplates || state.scheduleTemplates,
        serviceDuration: serviceDuration
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
        ...state,
        isLoading: false,
        error: false,
        success: true
      };
    case 'SET_SCHEDULE_TEMPLATES_EDIT_MODE':
      return {
        ...state,
        success: false
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = scheduleTemplates;
