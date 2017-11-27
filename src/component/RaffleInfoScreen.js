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
import { leaveRaffle } from '../api/apiHelper'

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

    console.log("PAssed state:", this.props)

    this.state = {
      raffleInfo: this.props.navigation.state.params.passedState.raffleInfo,
      queryData: this.props.navigation.state.params.passedState.queryData,
    }

    this.onPressLeave = this.onPressLeave.bind(this)
  }

  static navigationOptions = {
    title: 'JoinRaffleScreen',
    header: null,
  };

  componentDidMount() {

  }

  onPressLeave() {
    //leave raffle and go back
    const data = {
      email: this.state.queryData.email,
      accessToken: this.state.queryData.accessToken,
      serverAuthCode: this.state.queryData.serverAuthCode,
      organisation_id: this.state.raffleInfo.id
    }

    const user = {
      email: this.state.queryData.email,
      serverAuthCode: this.state.queryData.serverAuthCode,
      id: this.state.queryData.accessToken,
      name: this.state.queryData.name,
      givenName: this.state.queryData.firstName,
      familyName: this.state.queryData.lastName
    }

    const { goBack } = this.props.navigation;

    leaveRaffle(data)
      .then((result) => {
        // return JSON.parse(result._bodyText)
        goBack()
      })
      // .then((parsedData) => {
      //   // navigate('RaffleInfoScreen', { user: user });
      //   goBack()
      // })
      .catch((err) => {
        console.log("ERRRRRROR!!!!!!!!1 <", err)
      })

  }

  render () {
    const { navigate } = this.props.navigation;
    console.log('Raffle INFO screen:', this);

    // const deadlineDate = new date(this.props.navigation.state.params.raffleInfo.deadline)

    return (
      <View style={containerJoin} >
        <Text>Welcome: {this.state.queryData.name} </Text>
        <Text>DETAILS!!!!1</Text>
        <Text>ID:</Text>
        <Text>{this.state.raffleInfo.id}</Text>
        <Text>NAME:</Text>
        <Text>{this.state.raffleInfo.name}</Text>
        <Text>DEADLINE:</Text>
        <Text>{this.state.raffleInfo.deadline}</Text>
        <Text>PARTY</Text>
        <Text>{this.state.raffleInfo.party}</Text>
        <Text>LOCATION:</Text>
        <Text>{this.state.raffleInfo.location}</Text>
        <Button
          onPress={this.onPressLeave}
          title="Leave"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    )

    function renderLeaveButton() {
      // this will be rendered if date today is before deadline date
      return (
        <Button
        onPress={this.onPressLearnMore}
        title="Leave"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      )
    }
  }
}