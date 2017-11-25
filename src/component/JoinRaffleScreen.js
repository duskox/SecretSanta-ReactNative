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

export default class JoinRaffleScreen extends React.Component {
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

  onPressLearnMore(stuff) {
    console.log("Button pressed:", stuff)
  }

  render () {
    const { navigate } = this.props.navigation;
    console.log('This in Raffle screen:', this);

    return (
      <View style={containerJoin} >
        <Text>Welcome: { this.props.navigation.state.params.user.name }</Text>
        <Text>Available raffle:</Text>
        <Picker
          style={{width: '80%'}}
          selectedValue={this.state.selectedRaffle}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedRaffle: itemValue})}
        >
          <Picker.Item label="Berlin" value="berlin" />
          <Picker.Item label="Helsinki" value="helsinki" />
          <Picker.Item label="Stockholm" value="stockholm" />
          <Picker.Item label="London" value="london" />
          <Picker.Item label="München" value="munchen" />

        </Picker>
        <Button
          onPress={this.onPressLearnMore}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}