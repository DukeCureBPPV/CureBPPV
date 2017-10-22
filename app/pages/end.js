import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import * as navActions from '../navigation/actions';
import left from '../../assets/images/left_end.png';
import right from '../../assets/images/right_end.png';

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
  image: {
    width: 150,
    height: 250,
  },
});

const End = ({ goTo, treatmentSide }) => (
  <View style={styles.container}>
    <Image
      source={treatmentSide === 'left' ? left : right}
      style={styles.image}
    />
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
