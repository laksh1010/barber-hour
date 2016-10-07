const initialState = {
  channels: []
};

function notification(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CHANNEL':
      return {
        ...state,
        channels: state.channels.concat(action.data.channel)
      };
    case 'REMOVE_CHANNEL':
      var index = state.channels.findIndex(channel => channel === action.data.channel);
      return {
        ...state,
        channels: [
          ...state.channels.slice(0, index),
          ...state.channels.slice(index + 1)
        ]
      };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = notification;
