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

function setEditMode() {
  return {
    type: 'SET_IMAGES_EDIT_MODE'
  };
}

export {createImages, addImage, removeImage, addError, setEditMode};
