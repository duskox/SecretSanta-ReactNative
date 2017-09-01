'use strict';

var React = require('react-native');

var SecretSantaStyles = React.StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 3,
    backgroundColor: '#f00',
    alignItems: 'flex-start',
    top: 100,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
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
});

export default SecretSantaStyles;
