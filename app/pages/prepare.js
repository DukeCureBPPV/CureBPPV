import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import * as appActions from '../actions';
import * as navActions from '../navigation/actions';
import leftUp from '../../assets/images/left_prepare_up.png';
import leftSide from '../../assets/images/left_prepare_side.png';
import rightUp from '../../assets/images/right_prepare_up.png';
import rightSide from '../../assets/images/right_prepare_side.png';

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
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
  },
  imageUp: {
    width: 200,
    height: 100,
    paddingRight: 5,
  },
  imageSide: {
    width: 100,
    height: 100,
    paddingLeft: 5,
  },
});

const Prepare = ({ treatmentSide, markInitQuaternion, goTo }) => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image
        source={treatmentSide === 'left' ? leftUp : rightUp}
        style={styles.imageUp}
      />
      <Image
        source={treatmentSide === 'left' ? leftSide : rightSide}
        style={styles.imageSide}
      />
    </View>
    <Text style={styles.description}>
      Before you begin place a pillow behind you,
       so that on lying back it will be under your shoulders.
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

