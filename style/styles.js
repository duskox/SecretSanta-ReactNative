'use strict';

var React = require('react-native');

var SecretSantaStyles = React.StyleSheet.create({
  inputContainer: {
    flex: 3,
    flexDirection: 'column',
    borderWidth: 0,
    paddingLeft: 40,
    paddingRight: 40,
    borderColor: '#f00',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonStyle: {
    padding: 4,
    fontSize: 24,
    marginTop: 10,
    color: 'black',
    marginBottom: 10,
  },
});

export default SecretSantaStyles;
