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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 15,
  },
  description: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 18,
  },
});

const Prepare = ({ markInitQuaternion, goTo }) => (
  <View style={styles.container}>
    <Text style={styles.title}>
      IMPORTANT
    </Text>
    <Text style={styles.description}>
      Before you begin place a pillow behind you, so that on lying back it will be under your shoulders. Your head should not be on the pillow.
    </Text>
    <Text style={styles.description}>
      Sit up straight and hold the phone vertically.
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
    <Button
      title="Go Back Home"
      onPress={() => goTo('Home')}
    />
  </View>
);

const mapStateToProps = state => ({
  treatmentSide: state.app.get('treatmentSide'),
});

const mapDispatchToProps = dispatch => ({
  markInitQuaternion: () => {
    dispatch(appActions.markInitQuaternion());
  },
  goTo: (destination) => {
    dispatch(navActions.goTo(destination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Prepare);

