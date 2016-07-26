import t from 'tcomb-form-native';

let stylesheet = {
  ...t.form.Form.stylesheet,
  errorBlock: {
    color: '#DB162F',
    fontSize: 14,
    marginLeft: 5
  },
  helpBlock: {
    normal: {
      fontSize: 12,
      marginLeft: 5
    }
  }
};

export default stylesheet;
