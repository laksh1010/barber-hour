function loginWithFacebook(event) {
  console.log(event)
  let {provider, profile} = event;
  let {name, email, id} = profile;
  return {
    type: 'LOGGED_IN',
    data: {
      provider,
      name,
      email,
      id
    }
  }
}

function onLoginFound(event) {
  return {
    type: 'LOGGED_IN',
    data: {
      id: event.credentials.userId
    }
  }
}

export {loginWithFacebook, onLoginFound};
