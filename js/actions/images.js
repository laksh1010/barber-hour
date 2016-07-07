import api from '../api';

function createImages(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_IMAGES', data: data });

    api.post('/barber/images', { barber: { images_attributes: data } }, { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'IMAGES_CREATED', data: response.data }))
      .catch(error => dispatch({ type: 'INVALID_IMAGES', data: error.data }));
  }
}

function addImage(source) {
  return {
    type: 'ADD_IMAGE',
    data: {
      source,
    }
  };
}

function removeImage(imageUID) {
  return {
    type: 'REMOVE_IMAGE',
    data: {
      imageUID,
    }
  };
}

function addError() {
  return {
    type: 'ADD_IMAGES_ERROR'
  };
}

function getImages() {
  return (dispatch, getState) => {
    dispatch({ type: 'REQUEST_LOAD_IMAGES', data: {} });

    api.get('/barber/images', { headers: { 'Authorization': `Token ${getState().user.token}` } })
      .then(response => dispatch({ type: 'IMAGES_LOADED', data: response.data }))
      .catch(error => dispatch({ type: 'IMAGES_LOAD_FAILED', data: error.data }));
  }
}

export {createImages, addImage, removeImage, addError, getImages};
