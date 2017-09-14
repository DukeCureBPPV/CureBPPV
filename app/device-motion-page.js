import React, { Component } from 'react';
import {
  View, NativeModules, NativeEventEmitter, StyleSheet,
} from 'react-native';
import Svg, { Polygon } from 'react-native-svg';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const rotationStyle = ({ x, y, z }) => ({
  width: 100,
  height: 100,
  backgroundColor: '#eee',
  shadowOffset: { height: 1, width: 1 },
  shadowOpacity: 0.2,
  transform: [
    { perspective: 1000 },
    { rotateX: `${x}rad` },
    { rotateY: `${y}rad` },
    { rotateZ: `${z}rad` },
  ],
});

function toEulerianAngle({ w, x, y, z }) {
  // returns {roll, pitch, yaw} in radius
  const t0 = 2.0 * ((w * x) + (y * z));
  const t1 = 1.0 - (2.0 * ((x * x) + (y * y)));
  const roll = Math.atan2(t0, t1); // X roll

  let t2 = 2.0 * ((w * y) - (z * x));
  if (t2 > 1) {
    t2 = 1;
  }
  if (t2 < -1) {
    t2 = -1;
  }
  const pitch = Math.asin(t2); // Y pitch

  const t3 = 2.0 * ((w * z) + (x * y));
  const t4 = 1.0 - (2.0 * ((y * y) + (z * z)));
  const yaw = Math.atan2(t3, t4); // Z yaw

  return { roll, pitch, yaw };
}


class DeviceMotionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      w: null,
      x: null,
      y: null,
      z: null,
    };
  }

  componentDidMount() {
    const { DeviceMotion } = NativeModules;
    new NativeEventEmitter(DeviceMotion).addListener(
      'Rotation',
      ({ w, x, y, z }) => {
        this.setState({ w, x, y, z });
      },
    );
    DeviceMotion.startUpdates();
  }

  render() {
    const { w, x, y, z } = this.state;
    const { roll, pitch, yaw } = toEulerianAngle({ w, x, y, z });
    return (
      <View style={styles.container}>
        <View
          style={rotationStyle({
            x: roll,
            y: pitch,
            z: yaw,
          })}
        >
          <Svg width="100" height="100">
            <Polygon
              points="50,5 55,20 45,20"
              fill="#888"
            />
          </Svg>
        </View>
      </View>
    );
  }
}

export default DeviceMotionPage;
