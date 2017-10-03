import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as appActions from '../actions';
import * as navActions from '../navigation/actions';

const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  description: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const Prepare = ({ markInitQuaternion, goTo }) => (
  <View style={styles.container}>
    <Text style={styles.description}>
      Sit up straight on a bed and put a pillow on the bed,
      so that when you lie down your shoulder will fall onto the pillow.
    </Text>
    <Text style={styles.description}>
      Press the button below when you are ready.
    </Text>
    <Button
      title="I am Ready"
      onPress={() => {
        markInitQuaternion();
        goTo('Step1');
      }}
    />
  </View>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  markInitQuaternion: () => {
    dispatch(appActions.markInitQuaternion());
  },
  goTo: (destination) => {
    dispatch(navActions.goTo(destination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Prepare);

