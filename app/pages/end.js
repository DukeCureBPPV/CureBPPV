import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as navActions from '../navigation/actions';

const styles = StyleSheet.create({
  container: {
    paddingTop: 180,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  description: {
    padding: 20,
  },
});

const End = ({ goTo }) => (
  <View style={styles.container}>
    <Text style={styles.description}>
      Treatment Finished
    </Text>
    <Text style={styles.description}>
      Please sit up.
    </Text>
    <Button
      title="Go Back Home"
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
