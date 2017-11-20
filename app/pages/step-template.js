import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import Svg, { G, Circle, Polygon } from 'react-native-svg';
import ProgressBar from 'react-native-progress/Bar';
import Sound from 'react-native-sound';
import KeepAwake from 'react-native-keep-awake';
import Vector3D from '../math/vector3D';
import * as navActions from '../navigation/actions';

const styles = StyleSheet.create({
  container: {
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
    this.progress = 0;
    this.timestamp = null;
  }

  getUpdatedProgress(distanceToTarget) {
    const { timestamp, allowedDistance, totalTime } = this.props;
    let progress = this.progress;
    if (this.timestamp && distanceToTarget < allowedDistance) {
      progress += (timestamp - this.timestamp) / totalTime;
    }
    return progress;
  }

  playNoticeSound() {
    const { noticeSoundFile } = this.props;
    const sound = new Sound(noticeSoundFile, Sound.MAIN_BUNDLE, () => {
      sound.play();
    });
  }

  calculateMetrics() {
    const { quaternion, initQuaternion,
      treatmentSide, rotationLeft, rotationRight,
      instructionsLeft, instructionsRight } = this.props;
    // find target quaternion q0
    const qi = initQuaternion;
    const qr = treatmentSide === 'left' ? rotationLeft : rotationRight;
    const TQi = qi.toRotationMatrix();
    const qrBase = TQi.times(qr.toRotationMatrix()).times(TQi.T()).toQuaternion();
    const q0 = qrBase.times(qi);

    // calculate finalQuaternion, the rotation to be applied to the view.
    const q = quaternion;
    const T = q.toRotationMatrix();
    const T0 = q0.toRotationMatrix();
    const finalQuaternion = (T.T().times(T0).times(T))
      .toQuaternion()
      .times(q.inv());

    // calculate required rotation for setting the parameters right
    const qrBaseRequired = q.times(qi.inv());
    const qrRequired = TQi.inv().times(
      qrBaseRequired.toRotationMatrix(),
    ).times(TQi).toQuaternion();
    const rotationToTarget = qrRequired;

    const distanceToTarget = q.distTo(q0);

    // apply the rotation to 3D vectors and get (x, y, rotate) for the SVG 
    const { x, y, z } = new Vector3D(0, 0, -AREA_RADIUS).rotate(finalQuaternion);
    const rotateAngle = new Vector3D(1, 0, 0).rotate(finalQuaternion).getAngle2D();

    let transX = x;
    let transY = y;
    if (z > 0) {
      const factor = AREA_RADIUS / Math.sqrt((x * x) + (y * y));
      transX = x * factor;
      transY = y * factor;
    }

    const instructions = treatmentSide === 'left' ? instructionsLeft : instructionsRight;

    return {
      transX, transY, rotateAngle, distanceToTarget, rotationToTarget, instructions,
    };
  }

  render() {
    const { stepNumberText, timestamp, goTo, nextPageName, totalTime, noticeTime } = this.props;
    const { transX, transY, rotateAngle, distanceToTarget,
      rotationToTarget, instructions } = this.calculateMetrics();
    const progress = this.getUpdatedProgress(distanceToTarget);
    const noticeProgress = noticeTime / totalTime;

    if (this.progress <= noticeProgress && progress > noticeProgress) {
      this.playNoticeSound();
    }
    if (progress > 1) {
      goTo(nextPageName);
    }
    this.progress = progress;
    this.timestamp = timestamp;

    return (
      <View style={styles.container}>
        <KeepAwake />
        <Text style={styles.description}>
          {instructions}
        </Text>
        <Svg width="320" height="320">
          <Circle cx="160" cy="160" r={AREA_RADIUS} fill="#fff" stroke="#aaa" />
          <G scale="1.5" x={160 + transX} y={160 - transY} rotate={(-rotateAngle * 180) / Math.PI}>
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
        {/* <Text>distance to target: {distanceToTarget.toFixed(5)}</Text>
        <Text>rotation to target: {'\n'}{rotationToTarget.toString()}</Text> */}
        <ProgressBar width={200} height={30} progress={progress} />
        <Button
          title="Go Back Home"
          onPress={() => goTo('Home')}
        />
        <Text style={styles.description}>{stepNumberText}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  quaternion: state.app.get('quaternion'),
  timestamp: state.app.get('timestamp'),
  initQuaternion: state.app.get('initQuaternion'),
  treatmentSide: state.app.get('treatmentSide'),
});

const mapDispatchToProps = dispatch => ({
  goTo: (destination) => {
    dispatch(navActions.goTo(destination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StepTemplate);
