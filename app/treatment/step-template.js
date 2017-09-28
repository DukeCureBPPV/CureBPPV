import React from 'react';
import { View, Text, Button, StyleSheet, NativeModules, NativeEventEmitter } from 'react-native';
import Svg, { G, Circle, Polygon } from 'react-native-svg';
import ProgressBar from 'react-native-progress/Bar';
import Sound from 'react-native-sound';
import Quaternion from './quaternion';
import Vector3D from './vector3D';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  description: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 0,
    fontSize: 18,
  },
});

const AREA_RADIUS = 130;

class StepTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      z: 0,
      distanceToTarget: 0,
      progress: 0,
      timestamp: null,
      finalRotation: new Quaternion(1, 0, 0, 0),
      vector: new Vector3D(0, 0, 100),
      angle: 0,
      lastTenSeconds: false,
    };
    this.emitter = null;
    this.tenSecondsSound = null;
  }

  componentDidMount() {
    const { DeviceMotion } = NativeModules;
    this.emitter = new NativeEventEmitter(DeviceMotion);
    this.emitter.addListener(
      'Rotation',
      ({ w, x, y, z, timestamp }) => {
        // calculate finalQuaternion, the rotation to be applied to the view.
        const q = new Quaternion(w, x, y, z);
        const q0 = this.props.targetQuaternion;
        const T = q.toRotationMatrix();
        const T0 = q0.toRotationMatrix();
        const finalQuaternion = (T.T().times(T0).times(T))
          .toQuaternion()
          .times(q.inv());

        // apply the rotation to 3D vectors and get (x, y, rotate) for the SVG 
        const vector = new Vector3D(0, 0, -AREA_RADIUS).rotate(finalQuaternion);
        const angle = new Vector3D(1, 0, 0).rotate(finalQuaternion).getAngle2D();

        const distanceToTarget = q.distTo(q0);
        let progress = this.state.progress;
        if (this.state.timestamp !== null
          && distanceToTarget < this.props.allowedDistance) {
          progress += (timestamp - this.state.timestamp) / this.props.totalTime;
          if ((1 - progress) * this.props.totalTime < 10 && !this.state.lastTenSeconds) {
            this.setState({ lastTenSeconds: true });
            this.tenSecondsSound.play();
          }
        }
        if (progress > 1) {
          this.navigate(this.props.nextPageName);
        }

        this.setState({
          x: vector.x,
          y: vector.y,
          z: vector.z,
          angle,
          timestamp,
          progress,
          distanceToTarget,
          finalQuaternion,
          vector,
        });
      },
    );
    DeviceMotion.startUpdates();
    this.tenSecondsSound = new Sound('ten_seconds.mp3', Sound.MAIN_BUNDLE);
  }

  navigate(targetRoute) {
    NativeModules.DeviceMotion.stopUpdates();
    this.emitter.removeAllListeners('Rotation');
    this.props.navigation.navigate(targetRoute);
  }

  render() {
    const { stepNumberText } = this.props;
    const { x, y, z, angle, distanceToTarget } = this.state;

    let transX = x;
    let transY = y;
    if (z > 0) {
      const factor = AREA_RADIUS / Math.sqrt((x * x) + (y * y));
      transX = x * factor;
      transY = y * factor;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Keep your nose pointing to the black nose.
          Rotate head and phone together so that your nose move towards the large hollow nose.
        </Text>
        <Svg width="320" height="320">
          <Circle cx="160" cy="160" r={AREA_RADIUS} fill="#fff" stroke="#aaa" />
          <G scale="1.5" x={160 + transX} y={160 - transY} rotate={(-angle * 180) / Math.PI}>
            <Circle cx="0" cy="0" r="10" fill="none" stroke="#666" strokeWidth="2" />
            <Polygon points="0,-20 -8.66,-5 8.66,-5" fill="none" stroke="#666" strokeWidth="2" />
            <Circle cx="0" cy="0" r="10" fill="#fff" stroke="none" />
            <Polygon points="0,-20 -8.66,-5 8.66,-5" fill="#fff" stroke="none" />
          </G>
          <G scale="1.2" x="160" y="160" >
            <Circle cx="0" cy="0" r="10" fill="#000" stroke="none" />
            <Polygon points="0,-20 -8.66,-5 8.66,-5" fill="#000" stroke="none" />
          </G>
        </Svg>
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
