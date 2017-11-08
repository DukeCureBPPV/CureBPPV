import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput, View, Button, StyleSheet, Alert } from 'react-native';
import * as navActions from '../navigation/actions';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  section: {
    paddingTop: 50,
    paddingBottom: 50,
    alignItems: 'center',
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 1,
    height: 30,
    width: 150,
    borderColor: '#333',
  },
  largeText: {
    fontSize: 30,
  },
  smallText: {
    fontSize: 20,
  },
});

const PASSWORD = '123456';

const showLoginErrorMessage = () => {
  Alert.alert(
    'Wrong password',
    'Sorry your password is not correct. Please try again.',
    [
      {
        text: 'OK',
      },
    ],
    { cancelable: false },
  );
};

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredPassword: null,
    };
  }

  verifyLogin() {
    return (this.state.enteredPassword === PASSWORD);
  }

  loginSuccessfully() {
    this.props.goTo('Home');
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Password..."
          onChangeText={text => this.setState({ enteredPassword: text })}
          secureTextEntry
          autoCapitalize="none"
          style={styles.textInput}
        />
        <Button
          style={styles.section}
          title="Login"
          onPress={() => (this.verifyLogin() ? this.loginSuccessfully() : showLoginErrorMessage())}
        />
      </View>);
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  goTo: (destination) => {
    dispatch(navActions.goTo(destination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Password);
