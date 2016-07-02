import React from 'react';
import { View, StyleSheet } from 'react-native';

function address(locals) {
  return(
    <View>
      {locals.inputs.zipcode}
      {locals.inputs.street}
      <View style={styles.row}>
        <View style={styles.districtInput}>
          {locals.inputs.district}
        </View>
        <View style={styles.numberInput}>
          {locals.inputs.number}
        </View>
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  numberInput: {
    flex: .3
  },
  districtInput: {
    flex: .7
  }
});

export default address;
