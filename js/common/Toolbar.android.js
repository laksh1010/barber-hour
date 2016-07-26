import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ToolbarAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Toolbar = (props) => {
  const border = props.border ? <View style={styles.border}/> : <View />;
  const content = props.backIcon ? (
    <Icon.ToolbarAndroid
      navIconName='arrow-back'
      style={[styles.toolbar, props.style]}
      title={props.title}
      onIconClicked={() => props.navigator.pop()} />
  ) : (
    <ToolbarAndroid
      style={styles.toolbar}
      logo={require('../../img/logo-inline.png')} />
  );

  return(
    <View>
      {content}
      {border}
    </View>
  );
};

export default Toolbar;

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'white',
    height: 56,
  },
  border: {
    backgroundColor: '#E8E8E8',
    height: 1
  }
});
