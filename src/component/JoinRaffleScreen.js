import React from 'react';
import {
  View,
  Image,
  Text,
  AppRegistry,
  AppState,
  Picker,
  Button,
  ActivityIndicator,
  } from 'react-native';
import styles from '../../style/styles';
import { StackNavigator, NavigationActions } from 'react-navigation';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Config from 'react-native-config';
import { CLIENT_ID } from 'react-native-dotenv';
import { setUser, joinRaffle } from '../api/apiHelper'

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

    const queryData = {
      email: this.props.navigation.state.params.user.email,
      serverAuthCode: this.props.navigation.state.params.user.serverAuthCode,
      accessToken: this.props.navigation.state.params.user.id,
      name: this.props.navigation.state.params.user.name,
      firstName: this.props.navigation.state.params.user.givenName,
      lastName: this.props.navigation.state.params.user.familyName
    }

    this.state = {
      selectedRaffle: -1,
      queryData: queryData,
      organisations: [],
      queryHere: false,
    }

    this.onPressJoin = this.onPressJoin.bind(this)
  }

  static navigationOptions = {
    title: 'JoinRaffleScreen',
    header: null,
  };

  componentWillMount() {
    const { navigate } = this.props.navigation;
    setUser(this.state.queryData)
      .then((result) => {
        return result.data
      })
      .then((parsedData) => {
        if (parsedData.organisations != undefined) {
          this.setState({
            organisations: parsedData.organisations,
            queryHere: true,
            selectedRaffle: parsedData.organisations[0].id })
        } else {
          this.setState({
            raffleInfo: parsedData
          })
          navigate('RaffleInfoScreen', { passedState: this.state });
        }
      })
      .catch((err) => {
        console.log("Error:", err)
      })
  }

  componentDidMount() {
    // console.log("In DID MOUNT ------------------------------------------------")
    // console.log("DID MOUNT state:", this.state.queryData)
  }

  onPressJoin() {
    const { navigate } = this.props.navigation;
    const data = {
      email: this.state.queryData.email,
      accessToken: this.state.queryData.accessToken,
      serverAuthCode: this.state.queryData.serverAuthCode,
      organisation_id: this.state.selectedRaffle
    }
    joinRaffle(data)
      .then((result) => {
        console.log("Result:", result.data)
        return result.data
      })
      .then((parsed) => {
        console.log("Parsed result:", parsed)
        // navigate('JoinRaffleScreen', { user: user });
        this.setState({
          raffleInfo: parsed
        })
        navigate('RaffleInfoScreen', { passedState: this.state });
      })
      .catch((err) => {
        console.log("There was error:", err)
      })
  }

  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={containerJoin} >
        <Text>Welcome: { this.props.navigation.state.params.user.name }</Text>
        <Text>Available raffle:</Text>
        {renderPickerOrLoader(this.state)}
        {/* {renderPickerOrLoader().bind(this)} */}
        <Button
          onPress={this.onPressJoin}
          title="Join"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );

    function renderPickerOrLoader(localState) {
      if (localState.queryHere) {
        return (
          <Picker
            style={{width: '80%'}}
            onValueChange={(itemValue, itemIndex) => this.setSelectedPickerItem(itemValue, itemIndex)}
          >
            {localState.organisations.map((organisation) => <Picker.Item label={organisation.name} value={organisation.id} key={organisation.id}/>)}
          </Picker>
        )
      } else {
        return (
          <ActivityIndicator />
        )
      }
    }

    // function renderPickerOrLoader() {
    //   if (this.state.queryHere) {
    //     return (
    //       <Picker
    //         style={{width: '80%'}}
    //         onValueChange={(itemValue, itemIndex) => this.setSelectedPickerItem(itemValue, itemIndex)}
    //       >
    //         {this.state.organisations.map((organisation) => <Picker.Item label={organisation.name} value={organisation.id} key={organisation.id}/>)}
    //       </Picker>
    //     )
    //   } else {
    //     return (
    //       <ActivityIndicator />
    //     )
    //   }
    // }

  }
}
