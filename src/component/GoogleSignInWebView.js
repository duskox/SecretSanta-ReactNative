import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class GoogleSignInWebView extends Component {
  render() {
    return (
      <WebView
        source={require('../non-reactnative/signin.html')}
        style={{margin: 20}}
      />
    );
  }
}
