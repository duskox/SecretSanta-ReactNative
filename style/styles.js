'use strict';

var React = require('react-native');

var SecretSantaStyles = React.StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 3,
    borderWidth: 1,
    borderColor: '#f00',
    backgroundColor: '#aaa',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  imageItem: {
    flex: 3,
    width: 200,
    backgroundColor: '#fff',
    height: null,
    resizeMode: 'contain',
  },
  fillerBox: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0.5,
    justifyContent: 'center',
    width: 80,
  },
  textStyle: {
    backgroundColor: '#ccc',
  },
  indicator: {
    flex: 1,
  },
  inputText: {
    paddingLeft: 40,
    paddingRight: 40,
    height: 60,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  buttonStyle: {
    padding: 16,
    flexDirection: 'row',
    fontSize: 48,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f00',
  }
});

export default SecretSantaStyles;
