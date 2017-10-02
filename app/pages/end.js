import React from 'react';
import { connect } from 'react-redux';
import { View, Button, StyleSheet } from 'react-native';
import * as navActions from '../navigation/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const End = ({ goTo }) => (
  <View style={styles.container}>
    <Button
      title="Go Back Home"
      color="#2c4c91"
      onPress={() => goTo('Home')}
    />
  </View>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  goTo: (destination) => {
    dispatch(navActions.goTo(destination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(End);
