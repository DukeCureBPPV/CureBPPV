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

const rotationStyle = ({ rotateX, rotateY, rotateZ }) => ({
  width: 100,
  height: 100,
  backgroundColor: '#eee',
  shadowOffset: { height: 1, width: 1 },
  shadowOpacity: 0.2,
  transform: [
    { perspective: 1000 },
    { rotateY: `${rotateY}rad` },
    { rotateZ: `${rotateZ}rad` },
    { rotateX: `${rotateX}rad` },
  ],
});

class StepTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      distanceToTarget: 0,
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
        const q0 = this.props.targetQuaternion;
        const T = q.toRotationMatrix();
        const T0 = q0.toRotationMatrix();
        const { pitch, roll, yaw } = (T.T().times(T0).times(T))
          .toQuaternion()
          .times(q.inv())
          .toEulerianAngle();
        const rotateX = -pitch;
        const rotateY = roll;
        const rotateZ = -yaw;
        const distanceToTarget = q.distTo(q0);
        let progress = this.state.progress;
        if (this.state.timestamp !== null
          && distanceToTarget < this.props.allowedDistance) {
          progress += (timestamp - this.state.timestamp) / this.props.totalTime;
        }
        if (progress > 1) {
          this.navigate(this.props.nextPageName);
        }
        this.setState({
          timestamp, progress, rotateX, rotateY, rotateZ, distanceToTarget,
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
    const { stepNumberText } = this.props;
    const { rotateX, rotateY, rotateZ, distanceToTarget } = this.state;
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
        <Text>distance to target: {distanceToTarget.toFixed(5)}</Text>
        <ProgressBar width={200} height={30} progress={this.state.progress} />
        <Button
          title="Go Back Home"
          onPress={() => this.navigate('Home')}
        />
        <Text>{stepNumberText}</Text>
      </View>
    );
  }
}

export default StepTemplate;
