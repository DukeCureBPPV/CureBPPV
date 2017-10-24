import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as navActions from '../navigation/actions';

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  description: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const End = ({ goTo, treatmentSide }) => (
  <View style={styles.container}>
    <Text style={styles.description}>
      Treatment Finished
    </Text>
    <Text style={styles.description}>
      {treatmentSide === 'left' ? 'Sit up on the right side' : 'Sit up on the left side'}
    </Text>
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
  goTo: (destination) => {
    dispatch(navActions.goTo(destination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(End);
