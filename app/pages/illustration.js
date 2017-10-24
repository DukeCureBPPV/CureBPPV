import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Button, StyleSheet, Text } from 'react-native';
import * as navActions from '../navigation/actions';
import LeftImage from '../../assets/images/left_side.png';
import RightImage from '../../assets/images/right_side.png';

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  description: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  image: {
    width: 350,
    height: 210,
    marginBottom: 20,
  },
});

const Illustration = ({ treatmentSide, goTo }) => (
  <View style={styles.container} >
    <Text style={styles.description}>
      Here is an illustration of the manuever steps.{'\n'}Before you proceed, get familiar with them!{'\n'}
    </Text>
    <Image
      style={styles.image}
      source={treatmentSide === 'left' ? LeftImage : RightImage}
    />
    <Button
      title="Next"
      onPress={() => goTo('Prepare')}
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
  goTo: (destination) => {
    dispatch(navActions.goTo(destination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Illustration);
