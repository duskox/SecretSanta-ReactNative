import React from 'react';
import {
  View,
  LayoutAnimation,
  UIManager,
  AppRegistry,
} from 'react-native';
import { SantaAppNavigator } from './src/navigation/Navigator.js';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component {

  render() {
    return (
      <SantaAppNavigator/>
    )
  }


}

AppRegistry.registerComponent('SantaApp', () => App);
