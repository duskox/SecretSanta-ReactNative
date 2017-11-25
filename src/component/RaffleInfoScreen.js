import React from 'react';
import {
  View,
  Image,
  Text,
  AppRegistry,
  AppState,
  Picker,
  Button,
  } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
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
  backgroundColor: 'white',
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

export default class RaffleInfoScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRaffle: 'berlin'
    }
  }

  static navigationOptions = {
    title: 'JoinRaffleScreen',
    header: null,
  };

  cmponentDidMount() {

  }

  render () {
    const { navigate } = this.props.navigation;
    console.log('Raffle INFO screen:', this);

    return (
      <View style={containerJoin} >
        <Text>Welcome: { this.props.navigation.state.params.user.name }</Text>
        <Text>DETAILS!!!!1</Text>
      </View>
    );
  }
}