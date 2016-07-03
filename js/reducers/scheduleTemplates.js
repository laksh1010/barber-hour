const initialState = {
  isLoading: false,
  success: false,
  error: false,
  scheduleTemplates: [
    {weekday: 1, name: 'Segunda', active: false, opensAt: null, closesAt: null, error: null},
    {weekday: 2, name: 'Terça', active: false, opensAt: null, closesAt: null, error: null},
    {weekday: 3, name: 'Quarta', active: false, opensAt: null, closesAt: null, error: null},
    {weekday: 4, name: 'Quinta', active: false, opensAt: null, closesAt: null, error: null},
    {weekday: 5, name: 'Sexta', active: false, opensAt: null, closesAt: null, error: null},
    {weekday: 6, name: 'Sábado', active: false, opensAt: null, closesAt: null, error: null},
    {weekday: 0, name: 'Domingo', active: false, opensAt: null, closesAt: null, error: null}
  ],
  serviceDuration: '1:00',
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
      scheduleTemplate[field] = time;
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
        serviceDuration: action.data.serviceDuration
      };
    case 'ADD_SCHEDULE_TEMPLATE_ERROR':
      var {weekday} = action.data;
      var index = state.scheduleTemplates.findIndex(scheduleTemplate => scheduleTemplate.weekday === weekday);
      var scheduleTemplate = state.scheduleTemplates.find(scheduleTemplate => scheduleTemplate.weekday === weekday);
      return {
        ...state,
        scheduleTemplates: [
          ...state.scheduleTemplates.slice(0, index),
          Object.assign(scheduleTemplate, { error: 'escolha os horários' }),
          ...state.scheduleTemplates.slice(index + 1)
        ]
      };
    case 'ADD_SCHEDULE_TEMPLATES_ERROR':
      return {
        ...state,
        error: true
      };
    case 'INVALID_SCHEDULE_TEMPLATES':
      return {
        ...state,
        isLoading: false,
        success: false
      };
    case 'REQUEST_SCHEDULE_TEMPLATES':
      var scheduleTemplates = state.scheduleTemplates.map(scheduleTemplate => {
        return Object.assign(scheduleTemplate, { error: null });
      });
      return {
        ...state,
        isLoading: true,
        error: false,
        scheduleTemplates: scheduleTemplates
      };
    case 'SCHEDULE_TEMPLATES_CREATED':
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
