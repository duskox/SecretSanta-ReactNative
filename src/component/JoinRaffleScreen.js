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
import { setUser, joinRaffle, leaveRaffle } from '../api/apiHelper'
import dateFormat from 'dateformat'

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

const mainContainer = {
  flexDirection: 'column',
  flex: 1,
  backgroundColor: '#339900',
  justifyContent: 'space-between',
}

const underMainForLeftRightPadding = {
  flexDirection: 'row',
  flex: 1
}

const santaMainContainer = {
  flexDirection: 'row',
  flex: 1
}

const underSantaContainer = {
  flex: 1
}

const sidePadding = {
  flex: 0.1
}

const sidePaddingForImage = {
  flex: 1
}

const mainMiddleView = {
  flex: 0.9,
  flexDirection: 'column'
}

const activityIndicator = {
  backgroundColor: 'purple',
  flex: 1,
}

const pickerStyle = {
  width: '100%',
}

const joinButtonStyle = {
  width: '100%',
}

const bigPickerContainer = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const imageItem = {
  flex: 2,
  width: 200,
  backgroundColor: '#339900',
  height: null,
  resizeMode: 'contain',
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
      raffleJoined: false,

    }

    this.onPressJoin = this.onPressJoin.bind(this)
    this.onPressLeave = this.onPressLeave.bind(this)
    this.setSelectedPickerItem = this.setSelectedPickerItem.bind(this)
  }

  static navigationOptions = {
    title: 'JoinRaffleScreen',
    header: null,
  };

  componentWillMount() {
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
            raffleInfo: parsedData,
            raffleJoined: true,
            organisations: undefined,
            selectedRaffle: -1,
            queryHere: false
          })

        }
      })
      .catch((err) => {
        console.log("Error:", err)
      })
  }

  componentDidMount() {

  }

  onPressJoin() {
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
        this.setState({
          raffleInfo: parsed,
          raffleJoined: true
        })
      })
      .catch((err) => {
        console.log("Error joining raffle:", err)
      })
  }

  onPressLeave() {
    console.log("this.state", this.state)
    const data = {
      email: this.state.queryData.email,
      accessToken: this.state.queryData.accessToken,
      serverAuthCode: this.state.queryData.serverAuthCode,
      organisation_id: this.state.raffleInfo.id
    }
    console.log("In onPressLeave, data is:", data)
    leaveRaffle(data)
      .then((result) => {
        console.log("Result after raffle was left:", result)
        this.setState({
          raffleJoined: false,
          raffleInfo: undefined,
          queryHere: true,
          organisations: result.data
        })
      })
      .catch((err) => {
        console.log("Error leaving raffle:", err)
      })
  }

  setSelectedPickerItem(itemValue, itemIndex) {
    this.setState({
      selectedRaffle: itemIndex
    })
  }

  render () {
    const { navigate } = this.props.navigation;
    const leaveCallback = this.onPressLeave;
    const joinCallback = this.onPressJoin;
    const selectPicker = this.setSelectedPickerItem;

    return (
      <View style={mainContainer} >
        <View style={underMainForLeftRightPadding}>
          <View style={sidePadding} />
          <View style={mainMiddleView}>
            {renderSanta(this.state)}
            <View style={underSantaContainer}>
              {renderLoadingScreen(this.state)}
              {renderJoinedRaffleData(this.state)}
              {renderLeaveButton(this.state)}
              {renderPicker(this.state)}
            </View>
          </View>
          <View style={sidePadding} />
        </View>
      </View>
    );

    function renderLeaveButton(localState) {
      if (localState.raffleJoined) {
        const deadlineDate = new Date(localState.raffleInfo.deadline)
        const todayDate = new Date()
        if (todayDate < deadlineDate) {
          return (
            <Button
              onPress={leaveCallback}
              title="Leave"
              color="#db1111"
            />
          )
        } else {
          return (
            <Button
              onPress={leaveCallback}
              disabled
              title="Leave"
              color="#db1111"
            />
          )
        }
      }
    }

    function renderSanta(localState) {
      if (localState.raffleJoined) {
        return (
          <View style={santaMainContainer}>
            <View style={sidePaddingForImage} />
            <Image source={require('../../assets/colour-pixel-santa.png')} resizeMode='contain' style={imageItem}/>
            <View style={sidePaddingForImage} />
          </View>
        )
      } else {
        return (
          <View style={santaMainContainer}>
            <View style={sidePaddingForImage} />
            <Image source={require('../../assets/bw-pixel-santa.png')} resizeMode='contain' style={imageItem}/>
            <View style={sidePaddingForImage} />
          </View>
        )
      }
    }

    function renderJoinedRaffleData(localState) {
      const thanksStyle = {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
      }

      const smallPrint = {
        fontSize: 20,
        textAlign: 'center',
      }

      const stayPrint = {
        fontSize: 18,
        textAlign: 'center'
      }

      const centerTextView = {
        alignItems: 'center'
      }

      // const deadlineDate = new Date(localState.raffleInfo.deadline)

      console.log("Should joined info be shown:", localState.raffleInfo)
      if (localState.raffleInfo != undefined && localState.raffleJoined) {
        return (
          <View style={centerTextView}>
            <Text style={thanksStyle}>Thank you for joining {localState.raffleInfo.name} secret santa raffle!</Text>
            <Text> </Text>
            <Text style={smallPrint}>You can opt out before the round closes on {dateFormat(new Date(localState.raffleInfo.deadline), "fullDate")}</Text>
            <Text> </Text>
            <Text style={stayPrint}>If you stay you will receive who you buy the present for!</Text>
            <Text> </Text>
          </View>
        )
      }
    }

    function renderLoadingScreen(localState) {
      if (!localState.queryHere) {
        <ActivityIndicator class={activityIndicator} />
      }
    }

    function renderPicker(localState) {
      console.log("In render picker and queryHere is:", localState.queryHere)
      console.log("In render picker and localstate.joined:", localState.raffleJoined)
      console.log("What is in orgs:", localState.organisations)
      console.log("Should picker be shown:", (localState.queryHere && !localState.raffleJoined))
      if (localState.queryHere && !localState.raffleJoined) {
        return (
          <View style={bigPickerContainer}>
              <Picker
                style={pickerStyle}
                onValueChange={(itemValue, itemIndex) => selectPicker(itemValue, itemIndex)}>
                  {localState.organisations.map((organisation) => <Picker.Item label={organisation.name} value={organisation.id} key={organisation.id}/>)}
              </Picker>
              <Button
                style={joinButtonStyle}
                onPress={joinCallback}
                title="Join"
                color="#3eba00"
              />
          </View>
        )
      }
    }
  }
}

/*
<Text>Raffle details</Text>
<Text>ID:</Text>
<Text>{localState.raffleInfo.id}</Text>
<Text>NAME:</Text>
<Text>{localState.raffleInfo.name}</Text>
<Text>DEADLINE:</Text>
<Text>{localState.raffleInfo.deadline}</Text>
<Text>PARTY</Text>
<Text>{localState.raffleInfo.party}</Text>
<Text>LOCATION:</Text>
<Text>{localState.raffleInfo.location}</Text>
*/