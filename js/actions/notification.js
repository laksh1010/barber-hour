function addChannel(channel) {
  return {
    type: 'ADD_CHANNEL',
    data: {
      channel,
    }
  };
}

function removeChannel(channel) {
  return {
    type: 'REMOVE_CHANNEL',
    data: {
      channel,
    }
  };
}

export {addChannel, removeChannel};
