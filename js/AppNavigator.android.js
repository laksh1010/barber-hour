import React, { Component } from 'react';
import { Navigator } from 'react-native';

import RouteMapper from './RouteMapper';

const AppNavigator = (props) => {
  return(
    <Navigator
      initialRoute={props.initialRoute}
      configureScene={() => Navigator.SceneConfigs.FadeAndroid}
      renderScene={RouteMapper}
    />
  );
};

export default AppNavigator;
