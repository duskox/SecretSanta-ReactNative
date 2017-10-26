import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  Dimensions,
  Keyboard,
  DeviceEventEmitter,
  LayoutAnimation,
  AppRegistry,
  AppState,
  } from 'react-native';
import styles from '../../style/styles';
import { StackNavigator, NavigationActions } from 'react-navigation';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Config from 'react-native-config';
import { CLIENT_ID } from 'react-native-dotenv';

AppRegistry.registerComponent('SantaApp', () => JoinRaffleScreen);

const container = {
  background: 'blue',
}

export default class JoinRaffleScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'JoinRaffleScreen',
    header: null,
  };

  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.containerJoin} >

      </View>
    );
  }
}