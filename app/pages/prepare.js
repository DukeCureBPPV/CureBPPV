import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet, NativeModules, NativeEventEmitter } from 'react-native';
import Quaternion from '../math/quaternion';
import * as appActions from '../actions';
import * as navActions from '../navigation/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  description: {
    padding: 20,
  },
});

class Prepare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quaternion: new Quaternion(1, 0, 0, 0),
    };
  }

  componentDidMount() {
    const { DeviceMotion } = NativeModules;
    this.emitter = new NativeEventEmitter(DeviceMotion);
    this.emitter.addListener(
      'Rotation',
      ({ w, x, y, z }) => {
        const quaternion = new Quaternion(w, x, y, z);
        this.setState({ quaternion });
      },
    );
    DeviceMotion.startUpdates();
  }

  navigate(targetRoute) {
    NativeModules.DeviceMotion.stopUpdates();
    this.emitter.removeAllListeners('Rotation');
    this.props.goTo(targetRoute);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Sit up straight on a bed and make sure that when you lie back down,
           your head is positioned outside of the bed.
        </Text>
        <Text style={styles.description}>
          Press the button below when you are ready.
        </Text>
        <Button
          title="I am Ready"
          onPress={() => {
            this.props.setInitQuaternion(this.state.quaternion.copy());
            this.navigate('Step1');
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setInitQuaternion: (quaternion) => {
    dispatch(appActions.setInitQuaternion(quaternion));
  },
  goTo: (destination) => {
    dispatch(navActions.goTo(destination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Prepare);

