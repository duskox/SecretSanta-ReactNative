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

/***
 *     ________________        _       _______  _______
 *    (  ____ \__   __/\     /( \     (  ____ \(  ____ \
 *    | (    \/  ) (  ( \   / ) (     | (    \/| (    \/
 *    | (_____   | |   \ (_) /| |     | (__    | (_____
 *    (_____  )  | |    \   / | |     |  __)   (_____  )
 *          ) |  | |     ) (  | |     | (            ) |
 *    /\____) |  | |     | |  | (____/\ (____/\/\____) |
 *    \_______)  )_(     \_/  (_______(_______/\_______)
 *
 */

const containerJoin = {
  display: 'flex',
  backgroundColor: '#f00',
  alignItems: 'center',
  justifyContent: 'space-between',
}

/***
 *     _______ _______ _______ _______ _______ _       _______ _      _________
 *    (  ____ (  ___  |       |  ____ |  ___  | (    /(  ____ ( (    /\__   __/
 *    | (    \/ (   ) | () () | (    )| (   ) |  \  ( | (    \/  \  ( |  ) (
 *    | |     | |   | | || || | (____)| |   | |   \ | | (__   |   \ | |  | |
 *    | |     | |   | | |(_)| |  _____) |   | | (\ \) |  __)  | (\ \) |  | |
 *    | |     | |   | | |   | | (     | |   | | | \   | (     | | \   |  | |
 *    | (____/\ (___) | )   ( | )     | (___) | )  \  | (____/\ )  \  |  | |
 *    (_______(_______)/     \|/      (_______)/    )_|_______//    )_)  )_(
 *
 */

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
      <View style={containerJoin} >
        <Text>BLA</Text>
      </View>
    );
  }
}