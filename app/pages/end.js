import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet, AsyncStorage } from 'react-native';
import * as navActions from '../navigation/actions';

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    justIfyContent: 'space-around',
    alignItems: 'center',
  },
  description: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

class End extends Component {
  componentDidMount() {
    AsyncStorage.setItem('@CureBPPVf:finished', 'true')
      .then().catch();
  }

  render() {
    const { goTo, treatmentSide } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Treatment Finished
        </Text>
        <Text style={styles.description}>
          {treatmentSide === 'left' ? 'Sit up on the right side' : 'Sit up on the left side'}
        </Text>
        <Text style={styles.description}>
          You will now see a survey link on the home page of the app. If you would like to participate in our research, you can kindly complete the survey after one day.
        </Text>
        <Button
          title="Go Back Home"
          onPress={() => goTo('Home')}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  treatmentSide: state.app.get('treatmentSide'),
});

const mapDispatchToProps = dispatch => ({
  goTo: (destination) => {
    dispatch(navActions.goTo(destination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(End);
