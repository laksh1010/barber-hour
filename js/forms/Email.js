import t from 'tcomb-form-native';

const Email = t.refinement(t.String, (string) => string.includes('@') && string.includes('.'));

export default Email;
