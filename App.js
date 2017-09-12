import React from 'react';
import {
  View,
  LayoutAnimation,
  UIManager,
  AppRegistry,
  } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Root from './src/component/Root.js';
import Register from './src/component/Register.js';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const SantaAppNavigator = StackNavigator({
  Root: { screen: Root },
  Register: { screen: Register },
});

AppRegistry.registerComponent('SantaApp', () => App);

export default class App extends React.Component {
  render() {
    return (
      <SantaAppNavigator/>
    )
  }


}
