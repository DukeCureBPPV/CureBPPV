import React from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';
import sampleVideo from '../../assets/video/sample.mp4';

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const VideoPage = () => (
  <Video
    source={sampleVideo}
    style={styles.fullScreen}
  />
);

export default VideoPage;
