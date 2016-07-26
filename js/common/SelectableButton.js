import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

import Touchable from './Touchable';

const SelectableImageButton = (props) => {
  let styleKey;
  if (props.disabled) {
    styleKey = 'disabled';
  } else if (props.selected) {
    styleKey = 'selected';
  } else {
    styleKey = 'unselected'
  }

  const containerStyle = styles[`${styleKey}Container`];
  const textStyle = styles[`${styleKey}Text`];
  const onPress = props.disabled && !props.onPressIfDisabled ? null : props.onPress;

  return(
    <Touchable style={[containerStyle, styles.container, props.containerStyle]} onPress={onPress}>
      <View style={[containerStyle, styles.container, props.containerStyle]}>
        <Text style={[textStyle, styles.text, props.textStyle]}>{props.title}</Text>
        {props.text ? (
          <Text style={[textStyle, styles.text, props.textStyle]}>{props.text}</Text>
        ) : null}
      </View>
    </Touchable>
  );
};

export default SelectableImageButton;

var styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    borderWidth: 1,
    height: 60,
    width: 80,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  selectedContainer: {
    borderColor: '#00223A',
    backgroundColor: '#003459',
  },
  unselectedContainer: {
    borderColor: '#003459',
    backgroundColor: 'white',
  },
  disabledContainer: {
    borderColor: '#DCDCDC',
    backgroundColor: 'white',
  },
  selectedText: {
    color: 'white',
  },
  unselectedText: {
    color: '#003459',
  },
  disabledText: {
    color: '#DCDCDC'
  }
});
