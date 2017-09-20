import React from 'react';
import { View, Text, Button, StyleSheet, NativeModules, NativeEventEmitter } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import ProgressBar from 'react-native-progress/Bar';
import Quaternion from './quaternion';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const TARGET_ROLL = 1;
const TARGET_PITCH = 1;
const TARGET_YAW = 1;
const TOTAL_TIME = 30;
const ALLOWED_DIST = 2;

const rotationStyle = ({ rotateX, rotateY, rotateZ }) => ({
  width: 100,
  height: 100,
  backgroundColor: '#eee',
  shadowOffset: { height: 1, width: 1 },
  shadowOpacity: 0.2,
  transform: [
    { perspective: 1000 },
    { rotateZ: `${rotateZ}rad` },
    { rotateY: `${rotateY}rad` },
    { rotateX: `${rotateX}rad` },
  ],
});

function computeL2Distance(roll, pitch, yaw) {
  return Math.min((2 * Math.PI) - Math.abs(roll - TARGET_ROLL), Math.abs(roll - TARGET_ROLL))
    + Math.min((2 * Math.PI) - Math.abs(pitch - TARGET_PITCH), Math.abs(pitch - TARGET_PITCH))
    + Math.min((2 * Math.PI) - Math.abs(yaw - TARGET_YAW), Math.abs(yaw - TARGET_YAW));
}

class TreatmentStepOnePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      progress: 0,
      timestamp: null,
    };
    this.emitter = null;
  }

  componentDidMount() {
    const { DeviceMotion } = NativeModules;
    this.emitter = new NativeEventEmitter(DeviceMotion);
    this.emitter.addListener(
      'Rotation',
      ({ w, x, y, z, timestamp }) => {
        const q = new Quaternion(w, x, y, z);
        const { pitch, roll, yaw } = q.inv().toEulerianAngle();
        const dist = computeL2Distance(roll, pitch, yaw);
        let progress = this.state.progress;
        if (this.state.timestamp !== null && dist < ALLOWED_DIST) {
          progress += (timestamp - this.state.timestamp) / TOTAL_TIME;
        }
        if (progress > 1) {
          this.navigate('TreatmentStepTwo');
        }
        this.setState({
          timestamp,
          progress,
          rotateX: -(pitch - TARGET_PITCH),
          rotateY: (roll - TARGET_ROLL),
          rotateZ: -(yaw - TARGET_YAW),
        });
      },
    );
    DeviceMotion.startUpdates();
  }

  navigate(targetRoute) {
    NativeModules.DeviceMotion.stopUpdates();
    this.emitter.removeAllListeners('Rotation');
    this.props.navigation.navigate(targetRoute);
  }

  render() {
    const { rotateX, rotateY, rotateZ } = this.state;
    return (
      <View style={styles.container}>
        <Text>
          Move the phone and your head together
          to make the arrow point up.
        </Text>
        <View style={rotationStyle({ rotateX, rotateY, rotateZ })}>
          <Svg width="100" height="100">
            <Polygon points="50,5 55,20 45,20" fill="#888" />
          </Svg>
        </View>
        <ProgressBar width={200} height={30} progress={this.state.progress} />
        <Button
          title="Go Back Home"
          onPress={() => this.navigate('Home')}
        />
        <Text>step 1 / 3</Text>
      </View>
    );
  }
}

export default TreatmentStepOnePage;
