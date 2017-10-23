import React from 'react';
import { View, Animated, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from 'react-native-slider';

const styles = StyleSheet.create({
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

// format passed time in seconds into mins:seconds
function secondsToTime(time) {
  return `${Math.floor(time / 60)}:${time % 60 < 10 ? 0 : ''}${time % 60}`;
}

/**
 * props from parent:
 *  source: an imported video
 */
class VideoPlayer extends React.Component {
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

  handleSlideProgress(percentage) {
    this.player.seek(percentage * this.state.duration);
  }

  render() {
    return (
      <View style={[styles.videoBox, this.props.style]}>
        <Video
          style={styles.video}
          source={this.props.source}
          paused={this.state.paused}
          resizeMode="contain"
          onLoad={meta => this.setState({ duration: meta.duration })}
          onProgress={progress =>
            this.setState({ progress: progress.currentTime / this.state.duration })}
          onEnd={() => this.setState({ paused: true })}
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
              <Slider
                value={this.state.progress}
                onValueChange={value => this.handleSlideProgress(value)}
                thumbTouchSize={{ width: 50, height: 50 }}
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
    );
  }
}

export default(VideoPlayer);
