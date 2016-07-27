import React, { Component } from 'react';
import { NavigatorIOS } from 'react-native';

const AppNavigator = (props) => {
  return(
    <NavigatorIOS style={{flex: 1}} initialRoute={props.initialRoute} />
  );
};

export default AppNavigator;
