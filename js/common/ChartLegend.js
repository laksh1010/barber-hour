import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ChartLegend = (props) => {
  return(
    <View style={[styles.legendContainer, props.containerStyle]}>
      <Text style={styles.legendTitle}>Legenda:</Text>
      {props.items.map((item, i) => {
        return(
          <View key={i} style={styles.legendItem}>
            <View style={[styles.legendIcon, {backgroundColor: item.iconColor}]} />
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        )
      })}
    </View>
  );
};

export default ChartLegend;

var styles = StyleSheet.create({
  legendContainer: {
    alignSelf: 'center',
    padding: 10
  },
  legendTitle: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  legendItem: {
    flexDirection: 'row',
    padding: 5
  },
  legendLabel: {
    marginLeft: 10
  },
  legendIcon: {
    borderColor: '#003459',
    borderWidth: 1,
    borderRadius: 2,
    height: 20,
    width: 20
  }
});
