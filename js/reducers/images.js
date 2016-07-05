import uuid from 'node-uuid';

const initialState = {
  isLoading: false,
  success: false,
  error: false,
  images: []
};

function images(state = initialState, action) {
  switch (action.type) {
    case 'ADD_IMAGE':
      var {source} = action.data;
      var image = {uid: uuid.v4(), source: source, destroyed: false};
      return {
        ...state,
        images: state.images.concat(image)
      };
    case 'REMOVE_IMAGE':
      var {imageUID} = action.data;
      var index = state.images.findIndex(image => image.uid === imageUID);
      var image = state.images.find(image => image.uid === imageUID);
      return {
        ...state,
        images: [
          ...state.images.slice(0, index),
          Object.assign(image, { destroyed: true }),
          ...state.images.slice(index + 1)
        ]
      };
    case 'REQUEST_IMAGES':
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case 'IMAGES_CREATED':
      var response = action.data.images;
      var images = state.images.map((image, index) => {
        var newImage = response[index];
        if (!newImage) {
          newImage = { id: null };
        }
        return Object.assign(image, newImage);
      });

      return {
        ...state,
        isLoading: false,
        error: false,
        success: true,
        images: images
      };
    case 'INVALID_IMAGES':
      return {
        ...state,
        isLoading: false,
        success: false
      };
    case 'ADD_IMAGES_ERROR':
      return {
        ...state,
        error: true
      };
    case 'SET_IMAGES_EDIT_MODE':
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

module.exports = images;
