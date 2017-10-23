import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Button, Text, View, Linking, Animated, TouchableWithoutFeedback } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressBar from 'react-native-progress/Bar';
import sampleVideo from '../../assets/video/sample.mp4';
import * as navActions from '../navigation/actions';
import * as appActions from '../actions';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  section: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 80,
    paddingBottom: 15,
  },
  description: {
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center',
  },
  sideChoicesBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  videoBox: {
    width: 300,
    height: 230,
    justifyContent: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 30,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  duration: {
    color: '#FFF',
    marginLeft: 15,
  },
});

const SURVEY_URL = 'https://redcap.duke.edu/redcap/surveys/?s=YDW8TRLKPJ';

// format passed time in seconds into mins:seconds
function secondsToTime(time) {
  return `${Math.floor(time / 60)}:${time % 60 < 10 ? 0 : ''}${time % 60}`;
}

class VideoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false, // if the video is paused or not
      progress: 0, // the percentage of the video played, [0, 1]
      duration: 0, // the total time of the video
    };
    // use this.player.seek(time) when we need to change the position of the video
    this.player = null;
  }

  handleLoad(meta) {
    this.setState({
      duration: meta.duration,
    });
  }

  handleProgress(progress) {
    this.setState({
      progress: progress.currentTime / this.state.duration,
    });
  }

  handleEnd() {
    this.setState({
      paused: true,
    });
  }

  handlePressPlayPauseButton() {
    if (this.state.progress >= 1) {
      this.player.seek(0);
    }

    this.setState({
      paused: !this.state.paused,
    });
  }

  handlePressProgress(e) {
    const position = e.nativeEvent.locationX;
    const progress = position * (1 / 250) * this.state.duration;
    this.player.seek(progress);
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.section}>
          <Text style={styles.title}>Cure BPPV</Text>
          <Text style={styles.description}>
            Once you are diagnosed with BPPV,
            this app guides you with self-treatment.
          </Text>
        </View>

        <View style={styles.videoBox}>
          <Video
            style={styles.video}
            source={sampleVideo}
            paused={this.state.paused}
            resizeMode="contain"
            onLoad={meta => this.handleLoad(meta)}
            onProgress={progress => this.handleProgress(progress)}
            onEnd={() => this.handleEnd()}
            ref={(ref) => { this.player = ref; }}
          />

          <Animated.View style={styles.controls}>
            <TouchableWithoutFeedback onPress={() => this.handlePressPlayPauseButton()}>
              <Icon
                name={!this.state.paused ? 'pause' : 'play'}
                size={20}
                color="#FFF"
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={e => this.handlePressProgress(e)}>
              <View>
                <ProgressBar
                  progress={this.state.progress}
                  color="#FFF"
                  unfilledColor="rgba(255,255,255,.5)"
                  borderColor="#FFF"
                  width={200}
                  height={10}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.duration}>
              {secondsToTime(Math.floor(this.state.progress * this.state.duration))}
            </Text>
          </Animated.View>
        </View>

        <View style={styles.section}>
          <Text>Which side for treatment:</Text>
          <View style={styles.sideChoicesBox}>
            <Button
              title="left"
              onPress={() => {
                this.props.setTreatmentSide('left');
                this.props.goTo('Prepare');
              }}
            />
            <Button
              title="right"
              onPress={() => {
                this.props.setTreatmentSide('right');
                this.props.goTo('Prepare');
              }}
            />
          </View>
        </View>
        <View style={styles.section}>
          <Button
            title="Survey"
            onPress={() => { Linking.openURL(SURVEY_URL); }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setTreatmentSide: (treatmentSide) => {
    dispatch(appActions.setTreatmentSide(treatmentSide));
  },
  goTo: (destination) => {
    dispatch(navActions.goTo(destination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
