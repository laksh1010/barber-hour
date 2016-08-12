import React from 'react';
import { View, StyleSheet } from 'react-native';

function address(locals) {
  return(
    <View>
      {locals.inputs.zipcode}
      {locals.inputs.street}
      <View style={styles.row}>
        <View style={styles.largeInput}>
          {locals.inputs.district}
        </View>
        <View style={styles.smallInput}>
          {locals.inputs.number}
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.largeInput}>
          {locals.inputs.city}
        </View>
        <View style={styles.smallInput}>
          {locals.inputs.state}
        </View>
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  smallInput: {
    flex: .3
  },
  largeInput: {
    flex: .7
  }
});

export default address;
