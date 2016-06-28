import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';

import BarberIcon from './BarberIcon';

const SelectableImageButton = (props) => {
  const containerStyle = props.selected ? styles.selectedContainer : styles.unselectedContainer;
  const textStyle = props.selected ? styles.selectedText : styles.unselectedText;
  const iconColor = props.selected ? 'white' : '#003459';

  return(
    <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={props.onPress}>
      <View style={[containerStyle, styles.container, props.containerStyle]}>
        <BarberIcon name={props.icon} size={80} color={iconColor} />
        <Text style={[textStyle, styles.text, props.textStyle]}>{props.text}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default SelectableImageButton;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    padding: 5
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15
  },
  selectedContainer: {
    borderColor: '#00223A',
    backgroundColor: '#003459',
  },
  unselectedContainer: {
    backgroundColor: 'white',
    borderColor: '#003459',
  },
  selectedText: {
    color: 'white',
  },
  unselectedText: {
    color: '#003459',
  },
});
