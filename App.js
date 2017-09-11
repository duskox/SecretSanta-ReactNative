import React from 'react';
import Root from './src/Root.js';
import {
  View,
  LayoutAnimation,
  UIManager,
  } from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component {
  render() {
    return (
      <Root/>
    )
  }


}
