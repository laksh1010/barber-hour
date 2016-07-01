import t from 'tcomb-form-native';

let stylesheet = {
  ...t.form.Form.stylesheet,
  textbox: {
    normal: {
      padding: 0,
      paddingLeft: 5,
      paddingBottom: 10
    },
    error: {
      padding: 0,
      paddingLeft: 5,
      paddingBottom: 10
    }
  },
  errorBlock: {
    color: '#DB162F',
    fontSize: 14,
    marginLeft: 5
  }
};

export default stylesheet;
